const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  addresses: [
    {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
      zip: { type: String, required: true },
    },
  ],
});

exports.Profile = mongoose.model("Profile", profileSchema);
