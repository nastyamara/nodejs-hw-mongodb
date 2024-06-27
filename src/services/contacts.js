import Contact from "../db/Сontact.js";

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);