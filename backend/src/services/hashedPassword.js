const argon2 = require("argon2");

const hashPasswordWithoutUpload = async (req, res, next) => {
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  try {
    if (req.body.password) {
      const hashedPassword = await argon2.hash(req.body.password, hashOptions);
      delete req.body.password;
      req.body.password_hash = hashedPassword;

      next();
    } else {
      res.status(401).send("vérifiez vos données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = hashPasswordWithoutUpload;
