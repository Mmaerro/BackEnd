import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  rol: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
});

//
export const userModel = model("users", userSchema);
