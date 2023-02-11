const { Router } = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/auth.controller");

const router = Router();

router.post("/regsiter", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
