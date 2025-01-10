import { Request, Response } from "express";
import { UserServices } from "./user.services";
import { ErrorHandler } from "../../utils/errorHandler";

export class UserController {
    private userServices: UserServices;

    constructor(userServices: UserServices) {
        this.userServices = userServices;
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userServices.getAllUsers();
            return res.json(users);
        } catch (err: any) {
            return ErrorHandler.handleError(res, err);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return ErrorHandler.badRequest(res, "User ID is required");

            const user = await this.userServices.getUserById(id);

            if (!user) return ErrorHandler.notFound(res, "User not found");

            return res.json(user);
        } catch (err: any) {
            return ErrorHandler.handleError(res, err);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const userBody = req.body;

            if (!userBody) return ErrorHandler.badRequest(res, "User fields are required");

            const user = await this.userServices.createUser(userBody);

            return res.status(201).json(user);
        } catch (err: any) {
            if (err.message === "User already exists") return ErrorHandler.conflict(res, err.message);
            return ErrorHandler.handleError(res, err);
        }
    }

    async getUserProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await this.userServices.getUserById(id);

            if (!user) return ErrorHandler.notFound(res, "User not found");

            return res.json(user);
        } catch (err: any) {
            return ErrorHandler.handleError(res, err);
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, profilePicture } = req.body;

            if (!id) return ErrorHandler.badRequest(res, "User ID is required");

            const isDataEmpty = !name && !email && !profilePicture;
            if (isDataEmpty) return ErrorHandler.badRequest(res, "At least one field must be provided for update");

            const updatedUser = await this.userServices.updateUserProfile(id, { name, email, profilePicture });

            return res.status(200).json(updatedUser);
        } catch (err: any) {
            if (err.message === 'User profile not found') return ErrorHandler.notFound(res, "User profile not found");
            return ErrorHandler.handleError(res, err);
        }
    }
}
