const cartModel = require("../models/cart");
const ProductModel = require("../models/product");

//Add Product To Cart
const addToCart = async (req, res) => {
  const { id } = req.body;
  const Product = await ProductModel.findById(id);
  if (Product.invent <= 0) {
    req.flash("error", "موجودی در انبار کافی نیست");
    return res.redirect(`/product/details/${id}`);
  }
  if (!req.user) {
    req.flash("warning", "لطفا اول لاگین کنید");
    return res.redirect(`/product/details/${id}`);
  }
  const { _id } = req.user;
  const isExsist = await cartModel.findOne({
    user: _id,
  });
  if (isExsist) {
    await cartModel.updateOne(
      {
        user: _id,
      },
      {
        $push: { products: Product._id },
      }
    );
    await ProductModel.findByIdAndUpdate(id, {
      $inc: { invent: -1 },
    });
    return res.redirect(`/product/details/${id}`);
  }
  const p = new cartModel({
    user: req.user._id,
    products: [Product._id],
  });
  await p.save();
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { invent: -1 },
  });
  res.redirect(`/product/details/${id}`);
};

//Show Cart
const ShowCarts = async (req, res) => {
  const { _id } = req.user;
  const user = await cartModel.findOne({ user: _id });
  if (!user) {
    return res.render("cart", {
      isNull: true,
    });
  }
  res.cookie("cartId", user._id);
  const Products = await ProductModel.find({ _id: { $in: user.products } });
  let maxPrice = 0;
  const itemReapet = {};
  user.products.forEach((item) => {
    if (itemReapet[item]) {
      itemReapet[item]++;
    } else {
      itemReapet[item] = 1;
    }
  });
  for (let i of Products) {
    var count = itemReapet[i._id];
    if (i.isDiscount) {
      i.price = i.price - +i.disCount;
    }
    maxPrice += i.price * count;
  }
  user.TotlaPrice = maxPrice;
  await user.save();
  res.render("cart", {
    products: Products,
    Price: maxPrice,
    repeat: itemReapet,
    isNull: false,
  });
};

//Delete Item From Cart
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const cartProducts = await cartModel.findOne({ user: req.user._id });
  const itemIndexs = cartProducts.products.findIndex((item) => {
    return item == id;
  });
  if (itemIndexs === -1) {
    req.flash("error", "محصول پیدا نشد");
    return res.redirect("/cart");
  }
  cartProducts.products.splice(itemIndexs, 1);
  await cartProducts.save();
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { invent: 1 },
  });
  res.redirect("/cart");
};

//Add item To Cart if inventiry is exsist
const addOne = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (+product.invent <= 0) {
    req.flash("error", "موجودی کالا کافی نیست");
    return res.redirect("/cart");
  }
  await cartModel.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $push: { products: product._id },
    }
  );
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { invent: -1 },
  });
  res.redirect("/cart");
};

module.exports = {
  addToCart,
  ShowCarts,
  deleteCart,
  addOne,
};
