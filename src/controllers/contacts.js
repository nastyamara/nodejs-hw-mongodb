import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res, next) => {
 
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
           
        })

       
};
    
export const getContactByIdController = async (req, res) => {
        const { id } = req.params;
        const data = await getContactById(id);
        if (!data) {
throw createHttpError(404, "Contact not found")
         }
        
        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data
            
        });
    }

    ;

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

            if (!result) {
                next(createHttpError(404, "Contact not found"));
                return;
         }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data
    })
}

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const deletedContact = await deleteContact({ _id: id });
    
                if (!deletedContact) {
throw createHttpError(404, "Contact not found")
         }

     res.json({
        status: 204,
     
    })
}