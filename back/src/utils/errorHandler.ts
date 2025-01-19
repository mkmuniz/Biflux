import { Response } from "express";

export class ErrorHandler {
    static badRequest(res: Response, message: string) {
        return res.status(400).json({ message });
    }

    static notFound(res: Response, message: string) {
        return res.status(404).json({ message });
    }

    static conflict(res: Response, message: string) {
        return res.status(409).json({ message });
    }

    static handleError(res: Response) {
        return res.status(500).json({ message: "Internal server error" });
    }
}