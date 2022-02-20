const express = require("express");
const upload = require("../middleware/multer");
const routers = express.Router();

const {
  getProducts,
  getDetail,
  deleteProduct,
  updateProduct,
  fetchProduct,
} = require("./controller");

routers.param("productId", async (req, res, next, id) => {
  const product = await fetchProduct(id, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ status: 404, message: "product not found" });
  }
});

routers.get("/", getProducts);
//return one product based on id #
routers.get("/:productId", getDetail);

routers.delete("/:productId", deleteProduct);
routers.put("/:productId", upload.single("image"), updateProduct);
module.exports = routers;
