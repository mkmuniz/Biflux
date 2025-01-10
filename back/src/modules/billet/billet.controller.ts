import { Request, Response } from "express";
import { BilletServices } from "./billet.services";

export class BilletController {
    static async getAllBilletsByUserId(req: Request, res: Response) {
        try {
            const userId = req.query.userId as string;
            
            if (!userId) return res.status(400).json({ message: 'User ID is required' });

            const data = await BilletServices.getAllBilletsByUserId(userId);
            
            return res.json(data);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return res.json(404).json({ message: errorMessage });
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    static async uploadBillet(req: Request, res: Response) {
        try {
            const userId = String(req.body.userId);
            const file = req.file;
            
            if (!file) return res.status(400).json({ message: 'No file uploaded' });
            
            if (!userId) return res.status(400).json({ message: 'User ID is required' });

            const data = await BilletServices.uploadBillet(file, userId);

            return res.json(data);
        } catch (err: any) {
            const errorMessage = err.message;
            console.error(err);

            if (errorMessage === 'User not found') return res.json(404).json({ message: errorMessage });
            return res.status(500).json({ message: err.message });
        }
    };

    static async getDownloadUrl(req: Request, res: Response) {
        try {
            const { fileName } = req.params;

            if (!fileName) return res.status(400).json({ message: 'Filename is required' });

            const signedUrl = await BilletServices.getSignedDownloadUrl(fileName);

            return res.json({ downloadUrl: signedUrl });
        } catch (err: any) {
            return res.status(500).json({ message: 'Failed to generate download URL' });
        }
    }
}