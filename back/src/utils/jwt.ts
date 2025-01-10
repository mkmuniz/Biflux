import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret';
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_secret';

interface TokenUser {
    id: string;
    email: string;
    name: string;
}

export class TokenService {
    static generateTokens(user: TokenUser): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            accessTokenSecret,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            refreshTokenSecret,
            { expiresIn: '30d' }
        );

        return { accessToken, refreshToken };
    }

    static verifyAccessToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, accessTokenSecret);
    }

    static verifyRefreshToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, refreshTokenSecret);
    }
}
