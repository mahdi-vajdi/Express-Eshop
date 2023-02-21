const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { OrderItem } = require("./oderItem.model");

const orderSchema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAdress1: {
    type: String,
    required: true,
  },
  shippingAdress1: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

// set id field without (_) in responses
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", { virtuals: true });

// Calculate total price for the order
orderSchema.pre("save", async function (next) {
  const orderItems = await OrderItem.find({
    _id: { $in: this.orderItems },
  }).populate("product", "price");

  const prices = orderItems.map((orderItem) => {
    return orderItem.product.price;
  });
  this.totalPrice = prices.reduce((a, b) => a + b, 0);
});

// Delete related orderitems for this order
orderSchema.pre("findOneAndDelete", async function (next) {
  const order = await this.model.findOne(this.getQuery());
  const orderIds = order.orderItems;
  try {
    await OrderItem.deleteMany({ _id: { $in: orderIds } });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

exports.Order = mongoose.model("Order", orderSchema);
