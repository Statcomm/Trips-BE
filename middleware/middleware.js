exports.routerNotFound = (req, res) => {
  res.status(404).json({ message: "route is not found" });
};

exports.logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);

  next();
};

exports.hundleError = (err, req, res, next) => {
  // if (err.status) {
  //   res.status(err.status).json({ message: err.message });
  // } else {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};
