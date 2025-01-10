import { Router } from "express";
import { BilletController } from "./billet.controller";
import multer from 'multer';

const billetRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

billetRouter
    .get('/billet', BilletController.getAllBilletsByUserId)
    .post('/billet', upload.single('file'), BilletController.uploadBillet)
    .get('/billet/download/:fileName', BilletController.getDownloadUrl);

export default billetRouter;