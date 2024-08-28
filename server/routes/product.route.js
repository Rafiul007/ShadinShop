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
  uploadMultiple,
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("stock", "Stock is required").not().isEmpty(),
  ],
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
