const {} = require("express-validator");
const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");
const { registerCustomer } = require("../controllers/customer.controller");
const { uploadSingle } = require("../utils/multerConfig");

//register a customer
router.post("/register", authenticate, uploadSingle, registerCustomer);


module.exports = router;
