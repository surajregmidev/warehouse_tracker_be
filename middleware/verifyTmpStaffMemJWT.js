const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUserJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No Access" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError)
        res.status(401).json({ message: "Expired Token" });
      res.status(401).json({ message: "UnAuthorized" });
    } else {
      if (decoded.role != "USER") {
        res.status(401).json({ message: "UnAuthorized! Not a  User Role" });
      } else {
        req.user = decoded.email;
        next();
      }
    }
  });
};

module.exports = verifyUserJWT;
