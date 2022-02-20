const express = require("express");
const passport = require("passport");

const routers = express.Router();

const { getProfile, newProfile } = require("./controller");

routers.get("/", getProfile);

routers.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  newProfile
);

module.exports = routers;
