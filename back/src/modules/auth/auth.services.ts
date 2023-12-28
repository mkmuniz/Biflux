import { UserServices } from "../user/user.services";
import { generateTokens } from "../../utils/jwt";
import dayjs from "dayjs";

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

export class AuthServices {
    static async login(user: any) {
        const userFromDB: any = await UserServices.getUserByEmail(user.email);

        const isPasswordValid = await bcrypt.compare(user.password, userFromDB.password)

        if (isPasswordValid) {
            const refreshTokenExist = await this.getRefreshTokenByUserId(userFromDB.id);

            if (refreshTokenExist) {
                await this.deleteRefreshToken(refreshTokenExist.id);
            };

            const jti = uuidv4();
            const { accessToken, refreshToken } = generateTokens(userFromDB, jti);

            await this.addRefreshTokenToWhiteList({ jti, userId: userFromDB.id, hashedToken: refreshToken });

            return {
                id: userFromDB.id,
                name: userFromDB.name,
                email: userFromDB.email,
                accessToken,
                refreshToken
            };
        };

        return null;
    };

    static async getRefreshTokenByUserId(id: number) {
        const refreshToken = await db.refreshToken.findUnique({
            where: {
                userId: id
            }
        });

        return refreshToken;
    };

    static async getRefreshTokenById(id: string) {
        const refreshToken = await db.refreshToken.findUnique({
            where: {
                id
            }
        });

        return refreshToken;
    };

    static async generateNewRefreshToken(refreshTokenId: string) {
        const payload = jwt.verify(refreshTokenId, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await this.getRefreshTokenById(payload.jti);

        if (!savedRefreshToken) return null;

        const user: any = await UserServices.getUserById(savedRefreshToken.userId);

        if (!user) return null;

        await this.deleteRefreshToken(savedRefreshToken.id);

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);

        await this.addRefreshTokenToWhiteList({ jti, hashedToken: refreshToken, userId: user.id });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        };
    };

    static async addRefreshTokenToWhiteList({ jti, userId, hashedToken }: any) {
        const expiresIn = dayjs().add(15, "second").unix();

        return await db.refreshToken.create({
            data: {
                id: jti,
                hashedToken,
                expiresIn,
                userId
            }
        });
    };

    static async deleteRefreshToken(id: string) {
        return await db.refreshToken.delete({
            where: {
                id
            }
        });
    };

    static async getAllRefreshTokens() {
        return await db.refreshToken.findMany();;
    };
}