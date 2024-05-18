import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
}

export async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find(({ id }) => contactId === id);
  return contact || null;
}

export async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex(({ id }) => contactId === id);

  if (index === -1) return null;

  const [deletedContact] = list.splice(index, 1);
  await writeFile(list);

  return deletedContact;
}

export async function addContact(data) {
  const list = await listContacts();
  const contact = {
    id: nanoid(),
    ...data,
  };

  list.push(contact);
  await writeFile(list);

  return contact;
}

export async function updateContact(contactId, data) {
  const list = await listContacts();
  const index = list.findIndex(({ id }) => contactId === id);

  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...data,
  };
  await writeFile(list);

  return list[index];
}

async function writeFile(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, 2, 1));
}
