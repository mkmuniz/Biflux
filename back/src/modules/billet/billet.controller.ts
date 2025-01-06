import { Request, Response } from "express";
import { BilletServices } from "./billet.services";
import { db } from "../../db";

export class BilletController {
    static async getAllBillets(req: Request, res: Response) {
        try {
            const userId = req.query.userId as string;
            if (!userId)
                return res.status(400).json({ message: 'User ID is required' });

            const data = await BilletServices.getAllBilletsByUserId(userId);
            return res.json(data);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    static async uploadBillet(req: Request, res: Response) {
        try {
            const userId = String(req.body.userId);
            const file = req.file;

            if (!file)
                return res.status(400).json({ message: 'Nenhum arquivo enviado' });

            if (!userId)
                return res.status(400).json({ message: 'User ID is required' });

            const userExists = await db.user.findUnique({
                where: { 
                    id: userId.toString()
                }
            });

            if (!userExists)
                return res.status(404).json({ message: 'User not found' });

            const data = await BilletServices.uploadBillet(file, userId);
            
            return res.json(data);
        } catch (err: any) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: err.message });
        }
    };

    static async getDownloadUrl(req: Request, res: Response) {
        try {
            const { fileName } = req.params;
            const signedUrl = await BilletServices.getSignedDownloadUrl(fileName);
            return res.json({ downloadUrl: signedUrl });
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to generate download URL' });
        }
    }
}