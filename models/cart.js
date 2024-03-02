require("dotenv").config();
const mongoose = require("mongoose");

//Create CartModel

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [{ type: mongoose.Types.ObjectId }],
      ref: "Product",
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    TotlaPrice: { type: String },
    isOrder: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
