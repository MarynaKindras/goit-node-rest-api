import express from "express";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import validateBody from "../helpers/validateBody.js";
import authController from "../controllers/authController.js";
import authorize from "../middleware/authorize.js";
import { authLoginSchema, authRegisterSchema, authSubscriptionSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", [isBodyEmpty, validateBody(authRegisterSchema)], authController.register);

authRouter.post("/login", [isBodyEmpty, validateBody(authLoginSchema)], authController.login);

authRouter.post("/logout", [authorize], authController.logout);

authRouter.get("/current", [authorize], authController.current);

export default authRouter;
