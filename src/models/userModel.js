import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Email invalid"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserSchema = mongoose.model("users", userSchema);
export default UserSchema;
