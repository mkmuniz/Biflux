import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { ErrorHandler } from "../../utils/errorHandler";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) return ErrorHandler.badRequest(res, 'Invalid refresh token');

        try {
            const user = await AuthServices.login(email, password);
            return res.json(user);
        } catch (err: any) {
            if (err.message === 'User not found') return ErrorHandler.notFound(res, 'This user dont exists');
            if (err.message === 'Invalid password') return ErrorHandler.unAuthorized(res, 'Invalid credentials, try again');

            console.error('Login error:', err.message);
            return ErrorHandler.internalError(res);
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        if (!refreshToken) return ErrorHandler.badRequest(res, 'Refresh token is required');

        try {
            const newTokens = await AuthServices.getRefreshTokenByUserId(refreshToken);
            if (!newTokens) return ErrorHandler.badRequest(res, 'Invalid refresh token');

            return res.json(newTokens);
        } catch (error) {
            return ErrorHandler.internalError(res);
        }
    }
}