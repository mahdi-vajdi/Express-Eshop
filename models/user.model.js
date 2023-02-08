const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({});

exports.User = mongoose.model("User", userSchema);
