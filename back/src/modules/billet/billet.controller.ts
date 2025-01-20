import { Request, Response } from "express";
import { BilletServices } from "./billet.services";
import { ErrorHandler } from "../../utils/errorHandler";

export class BilletController {
    private billetServices: BilletServices;

    constructor(billetServices: BilletServices) {
        this.billetServices = billetServices
    }

    async getAllBilletsByUserId(req: Request, res: Response) {
        const { userId } = req.query;
        if (!userId) return ErrorHandler.badRequest(res, 'User ID is required');

        try {
            const billets = await this.billetServices.getAllBilletsByUserId(userId as string);
            return res.status(200).json(billets);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return ErrorHandler.notFound(res, errorMessage);
            return ErrorHandler.internalError(res);
        }
    };

    async uploadBillet(req: Request, res: Response) {
        const { userId } = req.body;
        const file = req.file;
        if (!file || !userId) return ErrorHandler.badRequest(res, 'Missing required fields');

        try {
            const billet = await this.billetServices.uploadBillet(file, userId as string);
            return res.status(200).json(billet);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return res.status(404).json({ message: errorMessage });
            return ErrorHandler.internalError(res);
        }
    };

    async getDownloadUrl(req: Request, res: Response) {
        const { fileName } = req.params;
        if (!fileName) return ErrorHandler.badRequest(res, 'Filename is required');

        try {
            const signedUrl = await this.billetServices.getSignedDownloadUrl(fileName);
            return res.json({ downloadUrl: signedUrl });
        } catch (err: any) {
            return ErrorHandler.internalError(res);
        }
    }

    async deleteBillet(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return ErrorHandler.badRequest(res, 'ID is required');

        try {
            await this.billetServices.deleteBillet(id);
            return res.status(204).send({ message: 'Billet deleted successfully'});
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'Billet not found') return res.status(404).json({ message: errorMessage });
            return ErrorHandler.internalError(res);
        }
    }
}