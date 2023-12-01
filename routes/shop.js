const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();
// add a middleware function, will be executed for every incoming request
// router.use handles ANY incoming request to the path '/', however the get, post, etc. filter it
router.get("/", (req, res, next) => {
  //   next(); // move to the next request, otherwise end here. If no next(), we should send back a response.
  res.sendFile(path.join(rootDir, "../", "views", "shop.html")); // rootDir is an absolute path of the folder where this file is (routes)
});
module.exports = router;
