require("dotenv").config();
const mongoose = require("mongoose");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const ProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    discount: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const disCountProduct = mongoose.model("Discount", ProductSchema);

module.exports = Product;
