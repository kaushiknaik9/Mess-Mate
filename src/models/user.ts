import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
});

const User = models.User || model("User", userSchema);
export default User;
