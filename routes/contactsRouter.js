import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.delete("/:id", contactsController.delete);

contactsRouter.post(
  "/",
  [isBodyEmpty, validateBody(createContactSchema)],
  contactsController.create
);

contactsRouter.put(
  "/:id",
  [isBodyEmpty, validateBody(updateContactSchema)],
  contactsController.update
);

export default contactsRouter;
