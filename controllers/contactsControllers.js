import controllerWrapper from "../decorators/controllerWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;

  const filter = { owner, ...(favorite && { favorite }) };
  const fields = "-createdAt -updatedAt";
  const options = {
    skip: (page - 1) * limit,
    limit,
  };

  const result = await contactsService.getContacts(filter, fields, options);
  const total = await contactsService.countContacts(filter);
  res.json({ data: result, total, page: Number(page) });
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactStatus(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAll: controllerWrapper(getAllContacts),
  getById: controllerWrapper(getOneContact),
  delete: controllerWrapper(deleteContact),
  create: controllerWrapper(createContact),
  update: controllerWrapper(updateContact),
  updateStatus: controllerWrapper(updateStatus),
};
