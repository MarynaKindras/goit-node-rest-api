import Contact from "../models/Contact.js";

export async function getContacts(filter = {}, fields = "", options = {}) {
  const contacts = await Contact.find(filter, fields, options).populate("owner", "email subscription");
  return contacts;
}

export async function countContacts(filter) {
  const count = await Contact.countDocuments(filter);
  return count;
}

export async function getContact(filter) {
  const contact = await Contact.findOne(filter);
  return contact;
}

export async function removeContact(filter) {
  const contact = await Contact.findOneAndDelete(filter);
  return contact;
}

export async function addContact(data) {
  const contact = await Contact.create(data);
  return contact;
}

export async function updateContact(filter, data) {
  const contact = await Contact.findOneAndUpdate(filter, data, { new: true });
  return contact;
}

export async function updateContactStatus(filter, data) {
  const contact = await Contact.findOneAndUpdate(filter, data, { new: true });
  return contact;
}
