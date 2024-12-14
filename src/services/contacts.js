import  Contact  from "../db/Contact.js";

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = async (payload) => {
    const contact = Contact.create(payload);
    return contact;
} 

export const updateContact = async(contactId, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(contactId, data, {new: true, includeResultMetadata: true, ...options});
   if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
}

export const deleteContact = filter => Contact.findOneAndDelete(filter);


// {
//     "status": 200,
//     "message": "Successfully found contact with id 6675a9f0cdc260eb6ac7d322!",
    // "data": {
    //     "_id": "6675a9f0cdc260eb6ac7d322",
    //     "name": "Yulia Shevchenko",
    //     "phoneNumber": "+380000000001",
    //     "email": "oleh1@example.com",
    //     "isFavourite": false,
    //     "contactType": "personal",
    //     "createdAt": "2024-05-08T13:12:14.954Z",
    //     "updatedAt": "2024-05-08T13:12:14.954Z"
    // }
// }