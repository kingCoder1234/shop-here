const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

// Define the address schema
const addressSchema = new Schema({
  village: {
    type: String,
    default: "",
  },
  district: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  pincode: {
    type: String,
    default: "",
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  tokens: [tokenSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerificationCode: {
    type: String,
  },
  emailVerificationCodeExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  address: addressSchema, // Use the address schema
  mobileNo: {
    type: String,
    default: "",
  },
});

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
