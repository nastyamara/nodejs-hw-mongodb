import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from "dotenv";

import env from "./utils/env.js";

import { getContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(env('PORT', 3000));

const setupServer = () => {
    const app = express();

    const logger = pino({
    transport: {
        target: 'pino-pretty'
    }
})
    app.use(logger);
    app.use(cors());

      app.get('/', (req, res) => {
    res.json({
      message: 'Hello, world!!!',
    });
  });


    app.get('/contacts', async(req, res) => {
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
           
        });
    });

    app.get('/contacts/:id', async (req, res) => {
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



    app.get((res, req) => {
        res.status(404).json({
            message: 'Not found'
        })
    })

    app.listen(3000, ()=> console.log(`Server running on ${PORT} PORT`))

}

export default setupServer;

