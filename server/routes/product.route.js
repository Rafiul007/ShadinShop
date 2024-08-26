const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { isSuperadmin } = require("../middlewares/isSuperAdmin");
const { uploadMultiple } = require("../utils/multerConfig");

const { createProduct } = require("../controllers/product.controller");

//create product routes (authenticated only by superadmin)
router.post(
  "/create",
  authenticate,
  isSuperadmin,
  uploadMultiple,
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("stock", "Stock is required").not().isEmpty(),
  ],
  createProduct
);
module.exports = router;
