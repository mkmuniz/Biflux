import { Request, Response } from "express";
import { BilletServices } from "./billet.services";

export class BilletController {
    static async getAllBillets(req: Request, res: Response) {
        try {
            const data = await BilletServices.getAllUsers();

            return res.json(data);
        } catch (err: any) {
            console.error(err);
        };
    };

    static async uploadBillet(req: Request, res: Response) {
        try {
            const data = await BilletServices.uploadBillet();

            return res.json(data);
        } catch (err: any) {
            console.error(err);
        };
    };
};