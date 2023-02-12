const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("verfication error: ", err.message);
      return res.sendStatus(403); // Invalid token
    }
    console.log("isAdmin: ", decoded.isAdmin);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    if (!decoded.isAdmin) return res.sendStatus(403);
    next();
  });
};
