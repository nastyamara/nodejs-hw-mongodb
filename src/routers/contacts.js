import express from "express";
import { getContacts, getContactById } from '../services/contacts.js';

const contactsRouter = express.Router();



    contactsRouter.get('/contacts', async(req, res) => {
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
           
        });
    });

    contactsRouter.get('/contacts/:id', async (req, res) => {
        const { id } = req.params;
        const data = await getContactById(id);
        if (!data) {
        return    res.status(404).json({
        message: "Contact not found"
    })
}
        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data
            
        });
    });





export default contactsRouter;