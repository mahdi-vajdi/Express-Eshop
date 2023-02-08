const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  detail: String,
  quantity: String,
});

exports.Product = mongoose.model("Product", productSchema);
