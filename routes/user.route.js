const express = require("express");
const { authAdmin } = require("../middlewares/auth.middleware");
const {
  createUser,
  getAllUsers,
  getUser,
  getUserCount,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/", authAdmin, createUser);
router.get("/", authAdmin, getAllUsers);
router.get("/:id", authAdmin, getUser);
router.get("/get/count", authAdmin, getUserCount);
router.put("/:id", authAdmin, updateUser);
router.delete("/:id", authAdmin, deleteUser);

module.exports = router;
