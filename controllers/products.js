const rootDir = require("../util/path");
const path = require("path");

const products = [];

exports.getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  products.push[{ title: req.body.title }];
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //   next(); // move to the next request, otherwise end here. If no next(), we should send back a response.
  res.sendFile(path.join(rootDir, "views", "shop.html")); // rootDir is an absolute path of the folder where this file is (contollers)
};
