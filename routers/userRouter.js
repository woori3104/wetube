import express from "express";
import routes from "../routes";
import {
    getEditProfile,
    getChangePassword,
    postChangePassword,
    postEditProfile,
    getMe,
    getUserDetail
} from "../controller/userController";
import { onlyPrivate, uploadAvatar} from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar,postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.me, onlyPrivate, getMe);
userRouter.get(routes.userDetail(), getUserDetail);

export default userRouter;