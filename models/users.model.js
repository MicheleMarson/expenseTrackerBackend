const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  balance: {
    type: Number,
    required: [true, "Balance is required"],
    default: 0
  },
  resetCode: {
    type: Number,
  }
},{
  timestamps: true // automatically provide created and updated 
})

const UsersModel = mongoose.model("users", usersSchema)

module.exports = UsersModel