import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and Password are requireds" });

        try {
            const user = await AuthServices.login(email, password);
            return res.json(user);
        } catch (err: any) {
            if (err.message === 'User not found') return res.status(404).json({ message: "This user dont exists" });
            if (err.message === 'Invalid password') return res.status(401).json({ message: "Invalid credentials, try again" });

            console.error('Login error:', err.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: "Refresh token is required" });

        try {
            const newTokens = await AuthServices.getRefreshTokenByUserId(refreshToken);
            if (!newTokens) return res.status(401).json({ message: "Invalid refresh token" });

            return res.json(newTokens);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}