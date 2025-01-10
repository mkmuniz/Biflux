import { Router } from "express";
import { UserServices } from "./user.services";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { CloudStorageService } from "../cloudinary/cloudinary.services";


const cloudStorageService = new CloudStorageService();
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository, cloudStorageService);
const userController = new UserController(userServices);

const userRouter = Router();

userRouter
    .get('/user/:id', (req, res) => userController.getUserById(req, res))
    .post('/user', (req, res) => userController.createUser(req, res))
    .get('/user/profile/:id', (req, res) => userController.getUserProfile(req, res))
    .patch('/user/profile/:id', (req, res) => userController.updateUserProfile(req, res));

export default userRouter;
