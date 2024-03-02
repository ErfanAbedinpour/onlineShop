const productModel = require("../models/product");
const cartModel = require("../models/cart");
const ShowProducts = async (req, res) => {
  const computer = await productModel.find({
    categorie: "computer",
  });
  const account = await productModel.find({
    categorie: "accounting",
  });
  const graphic = await productModel.find({
    categorie: "graphic",
  });
  res.render("productGrid", {
    computerProduct: computer,
    accountProduct: account,
    graphicProduct: graphic,
  });
};

const ShowAddProductPage = async (req, res) => {
  res.render("addProduct");
};
//Do Backend For add Product in DataBase
const addProduct = async (req, res) => {
  try {
    if (
      req.file.mimetype != "image/jpeg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/gif"
    ) {
      req.flash("error", "لطفا فرمت فایل صحیح نیست");
      return res.redirect(req.originalUrl);
    }
    const { title, describe, price, categorie, invent, model } = req.body;
    const p = new productModel({
      title,
      price: price.trim(),
      invent,
      describe: describe.trim(),
      categorie,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      model,
      user: req.user._id,
    });
    await p.save();
    req.flash("succsess", "با موفقیت اضافه شد");
    res.redirect(req.originalUrl);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(req.originalUrl);
  }
};

const productDetails = async (req, res) => {
  let isOnCart = false;
  const { id } = req.params;
  const product = await productModel.findByIdAndUpdate(id, {
    $inc: { view: 1 },
  });
  const userCart = await cartModel.findOne({ user: req.user._id.toString() });
  if (userCart) {
    if (userCart.products.includes(id)) {
      isOnCart = true;
    }
  }
  res.render("productdetails", {
    product,
    isOnCart,
  });
};

const showAllProducts = async (req, res) => {
  const products = await productModel.find({});
  res.render("manageProduct", {
    products,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productModel.deleteOne({
    _id: id,
  });
  req.flash("succses", "با موفیت خذف شد");
  res.redirect("/product/manage-product");
};

const getBestViewsAndNews = async (req, res) => {
  const newsProduct = await productModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(5);

  const viewsProduct = await productModel.find({}).sort({ view: -1 }).limit(5);

  return {
    newsProduct,
    viewsProduct,
  };
};

const editPageRender = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  res.render("addProduct", {
    isEdit: true,
    product,
  });
};

const editProduct = async (req, res) => {
  const { title, describe, price, categorie, invent } = req.body;
  const { id } = req.params;
  const data = {
    title,
    price: price.trim(),
    invent,
    describe: describe.trim(),
    categorie,
    user: req.user._id,
  };
  try {
    if (req.file) {
      if (
        req.file.mimetype != "image/jpeg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/gif"
      ) {
        req.flash("error", "لطفا فرمت فایل صحیح نیست");
        return res.redirect(req.originalUrl);
      } else {
        data["image"] = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
    }
    await productModel.findByIdAndUpdate(id, {
      $set: data,
    });
    await req.flash("succses", "با موفقیت ویرایش شد");
    res.redirect("/product/manage-product");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(req.originalUrl);
  }
};
module.exports = {
  ShowAddProductPage,
  ShowProducts,
  addProduct,
  productDetails,
  showAllProducts,
  deleteProduct,
  getBestViewsAndNews,
  editPageRender,
  editProduct,
};
