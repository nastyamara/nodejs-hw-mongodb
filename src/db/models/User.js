import { Schema, model } from "mongoose";
// import {mongooseSaveError, setUpdateSettings} from "./hooks.js"; //цей файл взяти з репозиторія викладача//

const userSchema = new Schema({
name: {
  type: String,
  required: true},
email: {
  type: String,
match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

}, {versionKey: false, timestamps: true});

const User = model("users", userSchema);
export default User;