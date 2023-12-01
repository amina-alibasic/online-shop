const express = require("express");

const router = express.Router();
const productsController = require("../controllers/products");
// Filtering middleware to certain request types (POST, GET, etc.)
// GET /admin/product
router.get("/add-product", productsController.getAddProduct);

// POST /admin/add-product
router.post("/add-product", productsController.postAddProduct);

module.exports = router;
