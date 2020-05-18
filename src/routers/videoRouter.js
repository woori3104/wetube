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
import { uploadVideo, onlyPrivate} from "../middlewares";

const videoRouter = express.Router();

//VIDEO UPLOAD
videoRouter.get(routes.upload, onlyPrivate,getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//VIDEO DETIAIL
videoRouter.get(routes.videoDetail(), videoDetail);

//EDIT VIDEO 
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);


videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;