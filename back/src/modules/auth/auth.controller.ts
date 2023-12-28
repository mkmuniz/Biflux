import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { UserServices } from "../user/user.services";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user: any = await UserServices.getUserByEmail(email);

            if (!user) return res.status(404).json({ message: "This email does not exist." });

            const tokens = await AuthServices.login({ email, password });

            if (!tokens) return res.status(401).json({ message: "Invalid credentials" });
            
            res.json(tokens);
        } catch (err: any) {
            console.error(err);
        };
    };

    static async getAllRefreshToken(req: Request, res: Response) {
        try {
            const refreshTokens = await AuthServices.getAllRefreshTokens();

            res.json(refreshTokens);
        } catch (err: any) {
            console.error(err);
            return
        };
    };

    static async generateNewRefreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            const newRefreshToken = await AuthServices.generateNewRefreshToken(refreshToken);

            if (!newRefreshToken) res.json({ message: "Not authorized" }).status(401);

            res.json(newRefreshToken);
        } catch (err: any) {
            console.error(err);
        };
    };
};