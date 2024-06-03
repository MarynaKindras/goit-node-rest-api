import { Schema, model } from "mongoose";
import { userSubscriptionValues } from "../utils/constants.js";
import { emailRegexp } from "../utils/validationPatterns.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    subscription: {
      type: String,
      enum: userSubscriptionValues,
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      type: String,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);

const User = model("user", userSchema);

User.createIndexes();

export default User;
