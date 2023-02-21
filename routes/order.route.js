const { Router } = require("express");
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

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.get("/get/ordercount", getOrderCount);
router.get("/get/totalsales", getTotalSales);
router.get("/get/orders", getUserOrders);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
