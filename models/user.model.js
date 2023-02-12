const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("model user: ", user);
  if (!user.isModified("password")) return next();

  // Encrypt the password
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    user.password = hashedPwd;
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function (expiry) {
  let payload = {
    id: this._id,
    isAdmin: this.isAdmin,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expiry,
  });
};

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

exports.User = mongoose.model("User", userSchema);
// exports.UserSchema = userSchema;
