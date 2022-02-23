const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");

const routers = express.Router();
const { signUp, signIn, newProfile } = require("./controller");

routers.post("/signup", upload.single("image"), signUp);
routers.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = routers;
