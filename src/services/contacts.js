import createHttpError from "http-errors";
import { fieldList, sortOrderList } from "../constants/contacts.js";
import Contact from "../db/Contact.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10, sortBy = fieldList[0], sortOrder = sortOrderList[0] }) => {
  const skip = (page - 1) * perPage; 
  const data = await Contact.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
  const totalItems = await Contact.countDocuments();
  const {totalPages, hasNextPage, hasPreviousPage} = calcPaginationData({total: totalItems, page, perPage})
  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
   
  }
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = async (payload) => {
    const contact = Contact.create(payload);
    return contact;
} 

export const updateContact = async (contactId, data, options = {}) => {

  const result = await Contact.findOneAndUpdate(contactId , data, { new: true, includeResultMetadata: true, ...options});
  if (!result) return null;
    // throw createHttpError(400, "Contact not found")
  

  return result;
  // {
  //   contact: result.value,
  //   isNew: Boolean(result?.lastErrorObject?.upserted),
  // };
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