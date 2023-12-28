import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter
    .get('/user', UserController.getAllUsers)
    .get('/user/:id', UserController.getUserById)
    .post('/user', UserController.createUser)

export default userRouter;