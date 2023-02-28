const { Router } = require("express");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  getUserOrders,
} = require("../controllers/order.controller");
const router = Router();

router.post("/", authUser, createOrder);
router.get("/", authAdmin, getAllOrders);
router.get("/:id", authAdmin, getOrder);
router.get("/get/ordercount", authAdmin, getOrderCount);
router.get("/get/totalsales", authAdmin, getTotalSales);
router.get("/get/orders", authUser, getUserOrders);
router.put("/:id", authAdmin, updateOrderStatus);
router.delete("/:id", authAdmin, deleteOrder);

module.exports = router;
