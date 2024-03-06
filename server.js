//Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const middleware = require("./middlewares/publucMiddlewares");
const userInfo = require("./middlewares/userInfo");
require("dotenv").config();
//Main
const app = express()
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

//StaticFiles
app.set("view engine", "ejs");
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/img", express.static(path.join(__dirname, "public", "img")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/fonts", express.static(path.join(__dirname, "public", "fonts")));
app.set("views", path.join(__dirname, "views"));

//Midlewares

app.use(cookieParser());
app.use(
  session({
    secret: "EMAM",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(middleware.getUser);
app.use(middleware.isAdmin);

//RouterFile
const authRouter = require("./router/auth");
const pages = require("./router/pages");
const mailRouter = require("./router/mail");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const CartRouter = require("./router/cart");
const BlogRouter = require("./router/blog");
const orderRouter = require("./router/order");

//Router
app.use("/", pages);
app.use("/auth", authRouter);
app.use("/mail", mailRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", CartRouter);
app.use("/blog", BlogRouter);
app.use("/order", orderRouter);

//404 Page
app.use(userInfo, (req, res) => {
  res.render("404");
});

module.exports = app;
