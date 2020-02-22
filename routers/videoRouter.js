import express from "express";
import routes from "../routes";
import {
    getUpload,
    postUpload,
    videoDetail,
    editVideo,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//VIDEO UPLOAD
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//VIDEO DETIAIL
videoRouter.get(routes.videoDetail(), videoDetail);

//EDIT VIDEO 
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);


videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;