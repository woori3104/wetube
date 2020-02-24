import express from "express";
import routes from "../routes";
import {
    getEditProfile,
    changePassword,
    postEditProfile,
    getMe
} from "../controller/userController";
import { onlyPrivate, uploadAvatar} from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar,postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate,changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, getMe);

export default userRouter;