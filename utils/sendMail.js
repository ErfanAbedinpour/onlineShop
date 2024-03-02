const nodemailer = require("nodemailer");
require("dotenv").config();

//Send Email To Target with email and Sunject And text oF Email
const SendEmail = async (email, title, text) => {
  try {
    if (!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
      return false;
    }
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env["EMAIL"],
        pass: process.env["PASS"],
      },
    });
    await transport.sendMail({
      from: process.env["EMAIL"],
      to: email,
      subject: title,
      text,
    });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = SendEmail;
