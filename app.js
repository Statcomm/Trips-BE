const express = require("express");
const tripRoute = require("./Trip/routes");
const userRoute = require("./users/routes");
const profileRoute = require("./Profile/routes");
const connectDB = require("./db/database");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const { localStrategy, jwtStrategy } = require("./middleware/passport");

const {
  routerNotFound,
  logger,
  hundleError,
} = require("./middleware/middleware");

const app = express();

//middleware
app.use(express.json());
app.use(logger);
app.use(cors());

//initializing passport for to check sign In
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//return all trips
app.use("/", userRoute);
app.use("/trips", tripRoute);
app.use("/", profileRoute);

//middleware
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(routerNotFound);

//middleware hundel Errors
app.use(hundleError);

//server use
connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
