const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  getUserCount,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/get/count", getUserCount);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
