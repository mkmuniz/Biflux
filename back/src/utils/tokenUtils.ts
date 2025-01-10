import crypto from 'crypto';

export class TokenUtils {
    static async hashToken(token: string): Promise<string> {
        return crypto
            .createHash('sha512')
            .update(token)
            .digest('hex');
    }

    static async compareHashedTokens(token: string, hashedToken: string): Promise<boolean> {
        const computedHash = await TokenUtils.hashToken(token);
        return computedHash === hashedToken;
    }
}
