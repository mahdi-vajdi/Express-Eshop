const { User } = require("../models/user.model");
const mongoose = require("mongoose");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required." });
  // check for duplicate email in database
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // Store the new user
    const result = await User.create(req.body);
    console.log(result);
    res.status(201).json({ success: `New user ${result.name} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name phone email").exec();
    if (!users) return res.status(404).json({ message: "There is no users." });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const foundUser = await User.findById(req.params.id)
      .select("-password")
      .exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ message: "No user matches the provided ID." });

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ errror: error.message });
  }
};

exports.getUserCount = async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) return res.status(500).json({ success: false });
  res.status(200).json({ userCount });
};

exports.updateUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    }).exec();

    if (!updatedUser)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res.status(200).json({ message: "Updated user successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ message: "The requested ID does not have a correct form" });

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
    if (!deletedUser)
      return res
        .status(404)
        .json({ message: "The requested ID does not have a correct form" });

    res.status(200).json({ message: "Deleted user successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
