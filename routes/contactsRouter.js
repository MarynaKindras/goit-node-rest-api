import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import isValidId from "../middleware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", [isValidId], contactsController.getById);

contactsRouter.delete("/:id", [isValidId], contactsController.delete);

contactsRouter.post("/", [isBodyEmpty, validateBody(createContactSchema)], contactsController.create);

contactsRouter.put("/:id", [isValidId, isBodyEmpty, validateBody(updateContactSchema)], contactsController.update);

contactsRouter.patch(
  "/:id/favorite",
  [isValidId, isBodyEmpty, validateBody(updateStatusContactSchema)],
  contactsController.updateStatus
);

export default contactsRouter;
