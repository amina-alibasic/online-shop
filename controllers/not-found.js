const path = require("path");
const rootDir = require("../util/path");

exports.getNotFound = (req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "not-found.html"));
};
