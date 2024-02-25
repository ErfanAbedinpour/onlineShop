//Modules
const express = require("express");

//RouterFile
const authRouter = require("./router/auth");
//Midlewares
const app = express()
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

//Router

app.use("/auth", authRouter);
module.exports = app;
