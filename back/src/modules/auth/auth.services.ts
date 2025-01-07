import { db } from "../../db";
import { comparePassword } from "../../utils/hashPassword";
import { generateTokens } from "../../utils/jwt";
import { hashToken } from "../../utils/hashToken";

export class AuthServices {
    static async login(email: string, password: string) {
        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user)
            throw new Error('User not found');

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword)
            throw new Error('Invalid password');

        const existingToken = await db.refreshToken.findUnique({
            where: { userId: user.id }
        });

        if (existingToken) {
            await db.refreshToken.delete({
                where: { id: existingToken.id }
            });
        }

        const { accessToken, refreshToken } = generateTokens({
            id: user.id,
            email: user.email,
            name: user.name
        });

        const hashedRefreshToken = await hashToken(refreshToken);

        await db.refreshToken.create({
            data: {
                hashedToken: hashedRefreshToken,
                userId: user.id,
                expiresIn: 604800,
            }
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    static async getRefreshTokenByUserId(userId: string) {
        return db.refreshToken.findUnique({
            where: { userId: Number(userId) }
        });
    }
}