const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
  try {
    // Validate category field
    const category = await Category.findById(req.body.category);
    if (!category)
      return res
        .status(400)
        .json({ message: "The category field doesn't exist." });

    const createdProduct = await Product.create(req.body);
    res
      .status(200)
      .json({ message: "Product created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  let filter = {};
  if (req.query.cat) filter = { category: req.query.cat.split(",") };
  try {
    const products = await Product.find(filter).populate("category");
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
    const foundProduct = await Product.findById(req.params.id).populate(
      "category"
    );
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
    // Validate category field
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category)
        return res
          .status(400)
          .json({ message: "The category field doesn't exist." });
    }

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

exports.getProductCount = async (req, res) => {
  const prodCount = await Product.countDocuments();

  if (!prodCount) return res.status(500).json({ success: false });
  res.status(200).json({ productCount: prodCount });
};

exports.getFeaturedProuducts = async (req, res) => {
  const featProds = await Product.find({ isFeatured: true });

  if (!featProds) return res.status(500).json({ success: false });
  res.status(200).json({ featuredProducts: featProds });
};
