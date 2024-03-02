require("dotenv").config();
const mongoose = require("mongoose");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    model: { type: String, required: true },
    describe: { type: String, required: true },
    price: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    invent: { type: Number, default: 1 },
    image: {
      data: Buffer,
      contentType: String,
    },
    categorie: {
      type: String,
      enums: ["computer", "graphic", "accounting"],
    },
    view: { type: Number, default: 0 },
    purches: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
