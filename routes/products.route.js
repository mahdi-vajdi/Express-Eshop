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
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authenticate, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured", getFeaturedProuducts);

module.exports = router;
