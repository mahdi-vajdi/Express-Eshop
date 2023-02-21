const mongoose = require("mongoose");
const { Order } = require("../models/order.model");
const { OrderItem } = require("../models/oderItem.model");

exports.createOrder = async (req, res) => {
  try {
    // check if there are order items in the req
    if (!req.body.orderItems)
      return res.status(400).json({ message: "There is no order items" });

    let order = req.body;

    // Create order items
    const orderItems = await OrderItem.create(order.orderItems);
    const orderItemsIds = orderItems.map((orderItem) => {
      return orderItem._id;
    });
    order.orderItems = orderItemsIds;

    const createdOrder = await Order.create(order);
    return res
      .status(200)
      .json({ message: "Order created", order: createdOrder });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .populate("user", "name email phone id isAdmin")
      .sort({ dateOrdered: -1 })
      .exec();
    if (!orders) return res.status(404).json("There is no orders");

    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const foundOrder = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .populate("user", "name email phone id isAdmin")
      .exec();

    if (!foundOrder)
      return res
        .status(404)
        .json({ message: "No pategory matches the provided ID." });

    res.status(200).json(foundOrder);
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};

exports.getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (!orderCount)
      return res.status(404).json({ message: "There is no orders" });

    res.status(200).json({ orderCount });
  } catch (error) {
    return res.status(500).json({ error: errror.message });
  }
};

exports.getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    {
      $group: { _id: null, totalSales: { $sum: "$totalPrice" } },
    },
  ]);

  if (!totalSales) return res.status(400).json({ messge: "There is no sales" });

  return res.status(200).json({ totalSales: totalSales[0].totalSales });
};

exports.getUserOrders = async (req, res) => {
  try {
    const orderList = await Order.find({ user: req.user.id })
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ dateOrdered: -1 })
      .exec();

    if (!orderList) return res.status(404).json(orderList);

    res.status(200).json({ Orders: orderList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).exec();

    if (!updatedOrder)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res
      .status(200)
      .json({ message: "Updated order successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).exec();

    if (!updatedOrder)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id).exec();
    if (!deletedOrder)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res.status(200).json({ message: "Deleted order successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
