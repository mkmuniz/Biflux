import { Request, Response } from "express";

import { UserServices } from "./user.services";
import { ErrorHandler } from "../../utils/errorHandler";

export class UserController {
    private userServices: UserServices;

    constructor(userServices: UserServices) {
        this.userServices = userServices;
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return ErrorHandler.badRequest(res, "User ID is required");

        try {
            const user = await this.userServices.getUserById(id);
            if (!user) return ErrorHandler.notFound(res, "User not found");

            return res.status(200).json(user);
        } catch (err: any) {
            console.error(err.message);
            return ErrorHandler.internalError(res);
        }
    }

    async createUser(req: Request, res: Response) {
        const userBody = req.body;
        if (!userBody) return ErrorHandler.badRequest(res, "User fields are required");

        try {
            const user = await this.userServices.createUser(userBody);
            return res.status(201).json(user);
        } catch (err: any) {
            if (err.message === "User already exists") return ErrorHandler.conflict(res, err.message);

            console.error(err.message);
            return ErrorHandler.internalError(res);
        }
    }

    async getUserProfile(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return ErrorHandler.badRequest(res, "User ID is required");

        try {    
            const user = await this.userServices.getUserById(id);
            if (!user) return ErrorHandler.notFound(res, "User not found");

            return res.status(200).json(user);
        } catch (err: any) {
            console.error(err.message);
            return ErrorHandler.internalError(res);
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, profilePicture } = req.body;
        if (!id) return ErrorHandler.badRequest(res, "User ID is required");

        const isDataEmpty = !name && !email && !profilePicture;
        if (isDataEmpty) return ErrorHandler.badRequest(res, "At least one field must be provided for update");

        try {
            const userProfile = await this.userServices.updateUserProfile(id, { name, email, profilePicture});
            return res.status(200).json(userProfile);
        } catch (err: any) {
            if (err.message === 'User profile not found') return ErrorHandler.notFound(res, "User profile not found");

            console.error(err.message);
            return ErrorHandler.internalError(res);
        }
    }
}
