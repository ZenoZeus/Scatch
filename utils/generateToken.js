const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email, id: user._id },
    "hey",
    { expiresIn: "1h" }
  );
  return token;
};
