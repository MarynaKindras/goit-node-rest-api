import path from "path";
import fs from "fs/promises";
import controllerWrapper from "../decorators/controllerWrapper.js";
import * as userService from "../services/userServices.js";
import { resizeAvatar } from "../utils/transformAvatar.js";
import HttpError from "../helpers/HttpError.js";

const publicFolder = path.resolve("public");

export const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await userService.updateUser({ _id: id }, { subscription });

  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file");
  }

  const { id } = req.user;
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(publicFolder, "avatars", filename);
  await resizeAvatar(oldPath, newPath);
  await fs.unlink(oldPath);

  const avatarURL = path.join("/avatars", filename);
  await userService.updateUser({ _id: id }, { avatarURL });

  res.json({ avatarURL });
};

export default {
  updateSubscription: controllerWrapper(updateSubscription),
  updateUserAvatar: controllerWrapper(updateUserAvatar),
};
