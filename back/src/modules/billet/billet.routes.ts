import { Router } from "express";

import { BilletServices } from "./billet.services";
import { BilletController } from "./billet.controller";

import multer from 'multer';

const billetRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

const billetServices = new BilletServices();
const billetController = new BilletController(billetServices);

billetRouter
    .get('/billet', (req, res) => billetController.getAllBilletsByUserId(req, res))
    .get('/billet/download/:fileName', (req, res) => billetController.getDownloadUrl(req, res))
    .post('/billet', upload.single('file'), (req, res) => billetController.uploadBillet(req, res))
    .delete('/billet/:id', (req, res) => billetController.deleteBillet(req, res));

export default billetRouter;