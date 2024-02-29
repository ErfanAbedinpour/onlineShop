require("dotenv").config();
const mongoose = require("mongoose");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    identified: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enums: ["ADMIN", "USER"] },
    isBan: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
