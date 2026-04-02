import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  cartItems: {
    type: Object,
    default: {},
  },
},{minimize:false});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;