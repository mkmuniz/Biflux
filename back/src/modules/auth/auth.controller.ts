import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password)
                return res.status(400).json({ message: "Email e a senha são requeridos" });

            try {
                const tokens = await AuthServices.login(email, password);

                return res.json(tokens);
            } catch (error: any) {
                if (error.message === 'User not found')
                    return res.status(404).json({ message: "Este usuário não existe" });

                if (error.message === 'Invalid password')
                    return res.status(401).json({ message: "Credenciais inválidas, tente novamente" });

                throw error;
            }
        } catch (err: any) {
            console.error('Login error:', err.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken)
                return res.status(400).json({ message: "Refresh token is required" });

            try {
                const newTokens = await AuthServices.getRefreshTokenByUserId(refreshToken);
                
                if (!newTokens)
                    return res.status(401).json({ message: "Invalid refresh token" });

                return res.json(newTokens);
            } catch (error) {
                return res.status(401).json({ message: "Not authorized" });
            }
        } catch (err: any) {
            console.error('Refresh token error:', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}