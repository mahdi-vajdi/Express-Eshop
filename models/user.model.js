const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Profile } = require("./profile.model");

const userSchema = new Schema({
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
  profile: mongoose.Schema.Types.ObjectId,
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("model user: ", user);
  if (!user.isModified("password")) return next();
  this.wasNew = this.isNew;

  // Encrypt the password
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    user.password = hashedPwd;
  } catch (err) {
    return next(err);
  }
});

userSchema.post("save", async function (next) {
  if (this.wasNew) {
    try {
      const profile = await Profile.create({ user: this._id });
      this.profile = profile._id;
    } catch (error) {
      return next(error);
    }
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
