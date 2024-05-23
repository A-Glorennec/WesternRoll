const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ***************CONTROLLERS******************* */

const adminControllers = require("./controllers/adminControllers");

/* ***************MIDDLEWARES******************* */

const hashedPassword = require("./services/hashedPassword");
const verifyToken = require("./services/verifyToken");
/* ***************ROUTES******************* */

router.post("/signup", hashedPassword, adminControllers.createAdmin);
router.post("/login", adminControllers.adminLogin);
router.get("/me", verifyToken, adminControllers.readAdminById);

/* ************************************************************************* */

module.exports = router;
