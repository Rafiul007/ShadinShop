const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { isSuperadmin } = require("../middlewares/isSuperAdmin");
const { uploadMultiple } = require("../utils/multerConfig");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImages,
} = require("../controllers/product.controller");

//create product routes (authenticated only by superadmin)
router.post(
  "/create",
  authenticate,
  isSuperadmin,
  (req, res, next) => {
    console.log("hello -----------0");
    next();
  },
  uploadMultiple,
  (req, res, next) => {
    console.log("hello -----------1");
    next();
  },
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price is required").isNumeric().withMessage("Price must be a number"),
    check("sizes", "Sizes are required").isArray({ min: 1 }).withMessage("Sizes must be an array with at least one size"),
    check("sizes.*.size", "Each size must have a size value").not().isEmpty(),
    check("sizes.*.quantity", "Each size must have a quantity").isNumeric().withMessage("Quantity must be a number"),
  ],
  (req, res, next) => {
    console.log("hello ------------2");
    next();
  },
  createProduct
);
//get all products
router.get("/", getProducts);
//get product by id
router.get("/:id", getProductById);
//delete a product by id
router.delete("/:id", authenticate, isSuperadmin, deleteProduct);
//update product by id
router.put("/:id", authenticate, isSuperadmin, uploadMultiple, updateProduct);
//update product images by id
router.put(
  "/images/:id",
  authenticate,
  isSuperadmin,
  uploadMultiple,
  updateProductImages
);
module.exports = router;
