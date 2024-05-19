import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import Contact from "../models/Contact.js";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

export async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
}

export async function addContact(data) {
  const contact = await Contact.create(data);
  return contact;
}

export async function updateContact(contactId, data) {
  const contact = await Contact.findByIdAndUpdate(contactId, data, { new: true });
  return contact;
}

export async function updateContactStatus(contactId, data) {
  const contact = await Contact.findByIdAndUpdate(contactId, data, { new: true });
  return contact;
}
