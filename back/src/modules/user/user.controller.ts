import { Request, Response } from "express";
import { UserServices } from "./user.services";

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const data = await UserServices.getAllUsers();

            return res.json(data);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        };
    };

    static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserServices.getUserById(id);

            return res.json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        };
    };

    static async createUser(req: Request, res: Response) {
        try {
            const userBody = req.body;
            const emailAlreadyExist = await UserServices.getUserByEmail(userBody.email);
            
            if (emailAlreadyExist) res.status(409).json({ message: 'Email already exists' })
            
            const user = await UserServices.createUser(userBody);

            res.json(user);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        };
    };
};