import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.valid('home', 'work', 'personal')
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.valid('home', 'work', 'personal')
});