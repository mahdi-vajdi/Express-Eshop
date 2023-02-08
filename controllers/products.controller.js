const { Product } = require("../models/product.model");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res
      .status(200)
      .json({ message: "Product created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(404).json("There is no products");

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const foundProduct = await Product.findById(req.params.id);
    if (!foundProduct)
      return res
        .status(404)
        .json({ message: "No product matches the provided ID." });

    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res.status(200).json({ message: "Deleted product successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
