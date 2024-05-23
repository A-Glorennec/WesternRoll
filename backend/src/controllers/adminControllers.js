/* eslint-disable camelcase */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    const { userName, password_hash } = req.body;

    const [results] = await tables.admins.createAdmin(userName, password_hash);

    if (results.affectedRows) {
      res.status(201).json({ message: "Admin created" });
    } else {
      res.status(401).json({ message: "Error during admin creation" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(401).json({ message: "Veuillez remplir tous les champs" });
    } else {
      const [admins] = await tables.admins.getUserByName(userName);

      if (admins.length) {
        const admin = admins[0];
        const isVerify = await argon2.verify(admin.password_hash, password);

        if (typeof isVerify === "boolean" && isVerify) {
          const token = jwt.sign(
            { payload: admins[0].id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).send({ token });
        } else {
          res.status(401).json("Vérifiez vos données");
        }
      } else {
        res.status(404).json("Le nom n'existe pas");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const readAdminById = async (req, res) => {
  try {
    const id = req.payload;
    const [admins] = await tables.admins.getAdmindById(id);

    if (admins.length) {
      res.status(200).json({ message: "Connecté", admin: admins[0] });
    } else {
      res.status(401).send("Vérifiez vos données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  adminLogin,
  createAdmin,
  readAdminById,
};
