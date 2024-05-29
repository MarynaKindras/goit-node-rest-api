import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const findUser = (filter, fields, options) => User.findOne(filter, fields, options);

export const saveUser = async data => {
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const result = User.create({ ...data, password: hashedPassword });
  return result;
};

export const updateUser = (filter, body) => User.findOneAndUpdate(filter, body);

export const removeUsers = () => User.deleteMany();
