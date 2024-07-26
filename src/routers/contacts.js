import express from "express";
import { getAllContactsController, getContactByIdController, createContactController, updateContactController, deleteContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { contactAddSchema , contactUpdateSchema} from "../validation/contactsValidationSchema.js";
import { isValidId } from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';



const contactsRouter = express.Router();


contactsRouter.use(authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
    
contactsRouter.post('/contacts', upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:id', upload.single('photo'), isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));

contactsRouter.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));





export default contactsRouter;