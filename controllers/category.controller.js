const { Category } = require("../models/category.model");
const mongoose = require("mongoose");

exports.createCategory = async (req, res) => {
  try {
    const createdCategory = await Category.create(req.body);
    return res
      .status(200)
      .json({ message: "Category created", category: createdCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    if (!categories) return res.status(404).json("There is no categories");

    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const foundCategory = await Category.findById(req.params.id).exec();
    if (!foundCategory)
      return res
        .status(404)
        .json({ message: "No pategory matches the provided ID." });

    res.status(200).json(foundCategory);
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).exec();

    if (!updatedCategory)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res
      .status(200)
      .json({ message: "Updated category successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.id
    ).exec();
    if (!deletedCategory)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res.status(200).json({ message: "Deleted category successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
