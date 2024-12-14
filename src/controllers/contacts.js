import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contacts.js';
import  createHttpError  from 'http-errors';

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
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    console.log(result);

            if (!result) {
                next(createHttpError(404, "Contact not found"));
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