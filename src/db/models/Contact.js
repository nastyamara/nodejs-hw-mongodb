import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['home', 'work', 'personal'],
        required: true,
        default: 'personal'
    },
    userId: {
type: Schema.Types.ObjectId,
ref: 'users',
required: true
    },
    photo: { type: String }
},
{versionKey: false},
{ timestamps: true }
);

const Contact = model("contacts", contactSchema);

export default Contact;