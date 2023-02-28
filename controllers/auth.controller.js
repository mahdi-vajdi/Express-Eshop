const { User } = require("../models/user.model");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required." });
  // check for duplicate email in database
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // set user isAdmin to false
    req.body.isAdmin = false;
    // Store the new user
    const result = await User.create(req.body);
    console.log(result);
    res.status(201).json({ success: `New user ${email} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Email is incorrect" }); // Unauthorized
  // Evaluate password
  const match = foundUser.comparePassword(password);
  if (match) {
    // Create JWTs
    const accessToken = foundUser.generateJWT("14m");
    const refreshToken = foundUser.generateJWT("1w");

    // Creates Secure Cookie with refresh token
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      // secure: true, // Commented out so api can be tested against postman. enable in production
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send Access Token to client
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

exports.refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(401);
  const refreshToken = cookies.refresh_token;

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, decoded) => {
    const foundUser = await User.findById(decoded.id).exec();
    if (!foundUser || err) return res.sendStatus(403); // Forbidden

    const accessToken = foundUser.generateJWT("14m");
    res.json({ accessToken });
  });
};

exports.logout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204); // No content

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};
