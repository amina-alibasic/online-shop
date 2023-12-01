const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

// add a middleware function, will be executed for every incoming request
// router.use handles ANY incoming request to the path '/', however the get, post, etc. filter it
router.get("/", productsController.getProducts);
module.exports = router;
