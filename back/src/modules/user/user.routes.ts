import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter
    .get('/user/:id', UserController.getUserById)
    .post('/user', UserController.createUser)
    .get('/user/profile/:id', UserController.getUserProfile)
    .patch('/user/profile/:id', UserController.updateUserProfile)
    
export default userRouter;
