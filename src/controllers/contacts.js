import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { contactAddSchema } from '../validation/contactsValidationSchema.js';
import parsePafinationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


export const getAllContactsController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const filter = { _id: userId };
    const { page, perPage } = parsePafinationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
 
        const data = await getContacts({page, perPage, sortBy, sortOrder, filter});
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
           
        })   
};
    
export const getContactByIdController = async (req, res) => {
    const {_id: userId}  = req.user;    
       const { id } = req.params;
const contact = await getContactById({_id: id, userId});
   if (!contact) {
       throw createHttpError(404, 'Contact not found');
    return;
  }
        
        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data: contact
            
        });
    };

export const createContactController = async (req, res) => {
  let photoUrl;
  const photo = req.file;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const {_id: userId}  = req.user;
    const data = await addContact({ ...req.body, userId, photo: photoUrl });
   

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data
    })
};

export const updateContactController = async (req, res, next) => {
let photoUrl;
  const photo = req.file;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const { id } = req.params;
    const {_id: userId}  = req.user;
    const result = await updateContact({ _id: id, userId }, {...req.body, photo: photoUrl });
    console.log(result);

    if (!result) {
        throw createHttpError(404, "Contact not found");
       
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.value
    })
}

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
      const {_id: userId}  = req.user;
    const deletedContact = await deleteContact({ _id: id, userId });
    
                if (!deletedContact) {
throw createHttpError(404, "Contact not found")
         }

    res.status(204).send();
}