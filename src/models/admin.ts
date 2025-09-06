import mongoose, { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

const Admin = models.Admin || model("Admin", adminSchema);
export default Admin;
