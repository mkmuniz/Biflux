import { Request, Response } from "express";
import { BilletServices } from "./billet.services";

export class BilletController {
    private billetServices: BilletServices;

    constructor(billetServices: BilletServices) {
        this.billetServices = billetServices
    }

    async getAllBilletsByUserId(req: Request, res: Response) {
        try {
            const userId = req.query.userId as string;
            
            if (!userId) return res.status(400).json({ message: 'User ID is required' });

            const data = await this.billetServices.getAllBilletsByUserId(userId);
            
            return res.status(200).json(data);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return res.status(404).json({ message: errorMessage });
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async uploadBillet(req: Request, res: Response) {
        try {
            const userId = String(req.body.userId);
            const file = req.file;
            
            if (!file || !userId) return res.status(400).json({ message: 'Missing required fields' });

            const data = await this.billetServices.uploadBillet(file, userId);

            return res.json(data);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return res.status(404).json({ message: errorMessage });
            return res.status(500).json({ message: err.message });
        }
    };

    async getDownloadUrl(req: Request, res: Response) {
        try {
            const { fileName } = req.params;

            if (!fileName) return res.status(400).json({ message: 'Filename is required' });

            const signedUrl = await this.billetServices.getSignedDownloadUrl(fileName);

            return res.json({ downloadUrl: signedUrl });
        } catch (err: any) {
            return res.status(500).json({ message: 'Failed to generate download URL' });
        }
    }

    async deleteBillet(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return res.status(400).json({ message: 'Client number is required' });

            await this.billetServices.deleteBillet(id);

            return res.status(204).send();
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'Billet not found') return res.status(404).json({ message: errorMessage });
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}