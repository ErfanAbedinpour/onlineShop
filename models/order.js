const mongoose = require("mongoose");
const JDate = require("jalali-date");

require("dotenv").config();
(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const ProcessSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    address: { type: String, required: true },
    email: { type: String },
    Price: { type: String },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    method: { type: String, enums: ["home", "Bank"], default: "home" },
    date: { type: String, default: new JDate().format("dddd DD MMMM YYYY") },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ProcessModel = mongoose.model("order", ProcessSchema);
module.exports = ProcessModel;
