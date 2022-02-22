const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");
const routers = express.Router();

const { getProfile, newProfile, createTrip } = require("./controller");

routers.get("/profiles", getProfile);

routers.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  newProfile
);
routers.post(
  "/:profileid/trips",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
module.exports = routers;
