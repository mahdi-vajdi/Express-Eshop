const { Router } = require("express");
const { authAdmin } = require("../middlewares/auth.middleware");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.post("/", authAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", authAdmin, updateCategory);
router.delete("/:id", authAdmin, deleteCategory);

module.exports = router;
