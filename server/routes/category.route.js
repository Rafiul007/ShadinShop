const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById
} = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/authMiddleware");
const { isSuperadmin } = require("../middlewares/isSuperAdmin");
const {uploadSingle} = require("../utils/multerConfig");

//create category routes (authenticated only by superadmin)
router.post(
  "/create",
  authenticate,
  isSuperadmin,
  uploadSingle,
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  createCategory
);
//get category by id
router.get("/:id", getCategoryById);

module.exports = router;