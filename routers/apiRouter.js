import express from "express";
import routes from "../routes";
import {
    postRegisterView
} from "../controller/videoController";
import { 
    postAddComment,
    deleteComment
} from "../controller/commentController"
const apiRouter = express.Router();

apiRouter.post(
    routes.registerView,
    postRegisterView
);

apiRouter.post(
    routes.addComment,
    postAddComment
);

apiRouter.get(
    routes.deleteComment,
    deleteComment
);


export default apiRouter;