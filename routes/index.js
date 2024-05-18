import express from "express";
import contactsRouter from "./contactsRouter.js";

const router = express.Router();

router.use("/contacts", contactsRouter);

export default router;
