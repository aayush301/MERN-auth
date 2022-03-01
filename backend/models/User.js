const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  },
  joiningTime: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model("Users", userSchema);
module.exports = User;