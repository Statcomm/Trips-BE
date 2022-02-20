const express = require("express");
const passport = require("passport");

const routers = express.Router();
const { signUp, signIn, newOrder } = require("./controller");

routers.post("/signup", signUp);
routers.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = routers;
