const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");
const routers = express.Router();

const {
  getProfile,
  newProfile,
  createTrip,
  updateProfile,
  fetchProfile,
} = require("./controller");

routers.param("profileId", async (req, res, next, id) => {
  const profile = await fetchProfile(id, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    next({ status: 404, message: "trip not found" });
  }
});

routers.get("/profiles", getProfile);

routers.post(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  newProfile
);
routers.put(
  "/profiles/:profileId",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
routers.post(
  "/:profileId/trips",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
module.exports = routers;
