const { Router } = require("express");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authenticate, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

module.exports = router;
