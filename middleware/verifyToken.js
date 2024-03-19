const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log({ headers: req.headers });
  if (!authorization && !authorization.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Token is invalid",
    });
  }
  const token = authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      message: "Token is invalid",
    });
  }
  jwt.verify(token, "bipin", (err, data) => {
    if (err) return res.status(401).send({ message: "invalid token" });
    else {
      const { id = "" } = data || {};
      req.token = token;
      res.userId = id;
      next();
    }
  });
};

module.exports = verifyToken;
