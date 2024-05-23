require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const headers = req.get("Authorization");

    const [type, token] = headers.split(" ");

    if (type === "Bearer") {
      const { payload } = jwt.verify(token, process.env.SECRET_KEY_JWT);

      req.payload = payload;
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = verifyToken;
