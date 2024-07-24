import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { contactAddSchema } from '../validation/contactsValidationSchema.js';
import parsePafinationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';

export const getAllContactsController = async (req, res, next) => {
    const { page, perPage } = parsePafinationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
 
        const data = await getContacts({page, perPage, sortBy, sortOrder});
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
           
        })   
};
    
export const getContactByIdController = async (req, res) => {
        const { id } = req.params;
        const contact = await getContactById(id);
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
    const data = await addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data
    })
};

export const updateContactController = async (req, res, next) => {
    const { id } = req.params;
    const result = await updateContact({ _id: id }, req.body);
    console.log(result);

    if (!result) {
        throw createHttpError(404, "Contact not found");
        return;
    }
              
         

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact
    })
}

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const deletedContact = await deleteContact({ _id: id });
    
                if (!deletedContact) {
throw createHttpError(404, "Contact not found")
         }

    res.status(204).send();
}