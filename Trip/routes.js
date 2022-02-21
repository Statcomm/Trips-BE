const express = require("express");
const upload = require("../middleware/multer");
const routers = express.Router();
const passport = require("passport");

const {
  getTrips,
  getDetail,
  deleteTrip,
  updateTrip,
  fetchTrip,
  createTrip,
} = require("./controller");

routers.param("tripId", async (req, res, next, id) => {
  const trip = await fetchTrip(id, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "trip not found" });
  }
});

routers.get("/", getTrips);
//return one trip based on id #
routers.get("/:tripId", getDetail);
routers.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);

routers.delete("/:tripId", deleteTrip);
routers.put("/:tripId", updateTrip);
module.exports = routers;
