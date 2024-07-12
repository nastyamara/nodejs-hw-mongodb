import express from "express";
import { getAllContactsController, getContactByIdController, createContactController, updateContactController, deleteContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";


const contactsRouter = express.Router();



contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));
    
contactsRouter.post('/contacts', ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:id', ctrlWrapper(updateContactController));

contactsRouter.delete('contacts/:id', ctrlWrapper(deleteContactController));





export default contactsRouter;