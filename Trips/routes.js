const express = require("express");

const passport = require("passport");

const upload = require("../middleware/multer");
const routers = express.Router();
const {
  createListShop,
  getShop,
  createProduct,
  getDetail,
  deleteShop,
  updateShop,
  fetchShop,
} = require("./controller");

routers.param("shopId", async (req, res, next, id) => {
  const shop = await fetchShop(id, next);
  if (shop) {
    req.shop = shop;

    next();
  } else {
    next({ status: 404, message: "product not found" });
  }
});

routers.get("/", getShop);

routers.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createListShop
);
routers.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createProduct
);
routers.get("/:shopId", getDetail);
routers.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  deleteShop
);
routers.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  updateShop
);

module.exports = routers;
