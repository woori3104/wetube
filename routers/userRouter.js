import express from "express";
import routes from "../routes";
import {
    editProfile,
    changePassword,
    getMe
} from "../controller/userController";
import { onlyPrivate } from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate,editProfile);
userRouter.get(routes.changePassword, onlyPrivate,changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, getMe);

export default userRouter;