import { Router } from "express";
import { AuthController } from "./auth.controller";
const authRouter = Router();

authRouter
    .get('/refreshtoken', AuthController.getAllRefreshToken)
    .post('/refreshtoken', AuthController.generateNewRefreshToken)
    .post('/login', AuthController.login)

export default authRouter;