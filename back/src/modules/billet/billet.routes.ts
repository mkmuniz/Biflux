import { Router } from "express";
import { BilletController } from "./billet.controller";

const userRouter = Router();

userRouter
    .get('/billet', BilletController.getAllBillets)
    .post('/billet', BilletController.uploadBillet)

export default userRouter;