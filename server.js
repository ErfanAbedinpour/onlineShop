//Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//RouterFile
const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const pages = require("./router/pages");
const mailRouter = require("./router/mail");
//Router
app.use("/", pages);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/mail", mailRouter);
app.use((req, res) => {
  res.render("404");
});

module.exports = app;
