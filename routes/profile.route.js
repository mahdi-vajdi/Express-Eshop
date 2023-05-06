const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const {
  createProfile,
  getProfile,
} = require("../controllers/profile.controller");
const router = express.Router();

router.post("/", authUser, createProfile);
router.get("/", authUser, getProfile);

module.exports = router;
