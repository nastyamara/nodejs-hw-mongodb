import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
   return next(createHttpError(404, `Contact with ID ${contactId} not found`));
  }

  next();
};