import bcryptjs from "bcryptjs";
import controllerWrapper from "../decorators/controllerWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as userService from "../services/userServices.js";
import { createToken } from "../helpers/jwt.js";
import gravatar from "gravatar";

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

  const newUser = await userService.saveUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
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

export const logout = async (req, res) => {
  const { id } = req.user;
  await userService.updateUser({ _id: id }, { token: "" });
  res.status(204).send();
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
};
