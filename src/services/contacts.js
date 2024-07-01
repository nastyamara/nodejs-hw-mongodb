import { Contact } from "../db/Contact.js";

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);