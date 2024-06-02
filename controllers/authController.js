import bcryptjs from "bcryptjs";
import controllerWrapper from "../decorators/controllerWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as userService from "../services/userServices.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { createToken } from "../helpers/jwt.js";
import sendMail from "../helpers/sendMail.js";
import { createVerificationEmail } from "../utils/emails.js";

export const register = async (req, res) => {
  const { email } = req.body;
  const user = await userService.findUser({ email }, ["email"]);
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "200", d: "mp" });

  const body = {
    ...req.body,
    avatarURL,
  };

  const verificationToken = nanoid();

  const newUser = await userService.saveUser({ ...body, verificationToken });

  sendMail(createVerificationEmail(email, verificationToken)).catch(console.error);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "User is not verified");
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const token = createToken({ id });
  await userService.updateUser({ _id: id }, { token });

  res.json({ token, user: { email: user.email, subscription: user.subscription } });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await userService.updateUser({ _id: id }, { token: "" });
  res.status(204).send();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userService.findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await userService.updateUser({ _id: user._id }, { verify: true, verificationToken: null });

  res.json({ message: "Verification successful" });
};

const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await userService.findUser({ email });
  console.log(user);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendMail(createVerificationEmail(email, user.verificationToken));

  res.json({ message: "Verification email sent" });
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  verifyEmail: controllerWrapper(verifyEmail),
  resendVerification: controllerWrapper(resendVerification),
};
