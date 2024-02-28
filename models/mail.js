require("dotenv").config();
const { boolean } = require("joi");
const mongoose = require("mongoose");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const mailBox = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    text: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isAnswer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const mail = mongoose.model("mail", mailBox);

module.exports = mail;
