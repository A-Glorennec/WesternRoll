const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ***************CONTROLLERS******************* */

const adminControllers = require("./controllers/adminControllers");

/* ***************MIDDLEWARES******************* */

const hashedPassword = require("./services/hashedPassword");

/* ***************ROUTES******************* */

router.post("/signup", hashedPassword, adminControllers.createAdmin);
router.post("/login", adminControllers.adminLogin);

/* ************************************************************************* */

module.exports = router;
