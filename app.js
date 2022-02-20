const express = require("express");
const productRoute = require("./Products/routes");
const shopRoute = require("./Shop/routes");
const userRoute = require("./users/routes");
const orderRoute = require("./Order/routes");
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

//return all products
app.use("/", userRoute);
app.use("/products", productRoute);
app.use("/shops", shopRoute);
app.use("/", orderRoute);

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
