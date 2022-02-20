const express = require("express");
const passport = require("passport");

const routers = express.Router();

const { getOrder, newOrder } = require("./conterller");

routers.get("/orders", getOrder);

routers.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  newOrder
);

module.exports = routers;
