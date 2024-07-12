import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from "dotenv";
import env from "./utils/env.js";
import contactsRouter from './routers/contacts.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';



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
  app.use(express.json());

      app.get('/', (req, res) => {
    res.json({
      message: 'Hello, world!!!',
    });
      });
    app.use(contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);


    app.listen(3000, ()=> console.log(`Server running on ${PORT} PORT`))

}

export default setupServer;

