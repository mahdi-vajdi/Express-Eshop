const { Router } = require("express");
const { authAdmin } = require("../middlewares/auth.middleware");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProuducts,
  setGalleryImages,
} = require("../controllers/products.controller");
const { uploadOptions } = require("../middlewares/imageUpload.middleware");

const router = Router();

router.post("/", authAdmin, uploadOptions.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authAdmin, updateProduct);
router.put(
  "/gallery/:id",
  authAdmin,
  uploadOptions.array("images", 10),
  setGalleryImages
);
router.delete("/:id", authAdmin, deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured", getFeaturedProuducts);

module.exports = router;
