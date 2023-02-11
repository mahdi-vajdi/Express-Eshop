const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProuducts,
} = require("../controllers/products.controller");

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured", getFeaturedProuducts);

module.exports = router;
