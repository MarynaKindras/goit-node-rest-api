import express from "express";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import validateBody from "../helpers/validateBody.js";
import authorize from "../middleware/authorize.js";
import userController from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import handleMulterError from "../middleware/handleMulterError.js";
import { authSubscriptionSchema } from "../schemas/authSchemas.js";
import { allowedImageExtensions } from "../utils/imageUploadConfig.js";

const userRouter = express.Router();

const configuredUpload = upload({ allowedExtensions: allowedImageExtensions }).single("avatar");

userRouter.patch(
  "/",
  [authorize, isBodyEmpty, validateBody(authSubscriptionSchema)],
  userController.updateSubscription
);

userRouter.patch(
  "/avatars",
  [authorize, handleMulterError(configuredUpload)],
  userController.updateUserAvatar
);

export default userRouter;
