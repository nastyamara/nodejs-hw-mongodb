import express from "express";
import { getAllContactsController, getContactByIdController, createContactController, updateContactController, deleteContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { contactAddSchema , contactUpdateSchema} from "../validation/contactsValidationSchema.js";
import { isValidId } from "../middlewares/isValidId.js";



const contactsRouter = express.Router();



contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
    
contactsRouter.post('/contacts', validateBody(contactAddSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:id', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));

contactsRouter.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));





export default contactsRouter;