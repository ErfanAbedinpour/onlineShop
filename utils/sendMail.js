const nodemailer = require("nodemailer");
require("dotenv").config();
const SendEmail = async (email, title, text) => {
  try {
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
