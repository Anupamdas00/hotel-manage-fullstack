import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { Schema } from "mongoose";

export type UserType = {
    _id : string,
    email : string,
    password : string,
    firstName : string,
    lastName : string
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
