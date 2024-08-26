const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { isSuperadmin } = require("../middlewares/isSuperAdmin");
const { createDiscount } = require("../controllers/discount.controller");
const { uploadSingle } = require("../utils/multerConfig");
//create discount routes (authenticated only by superadmin)
router.post(
  "/create",
  uploadSingle,
  authenticate,
  isSuperadmin,
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("discount", "Discount is required").not().isEmpty(),
    check("startDate", "Start Date is required").not().isEmpty(),
    check("endDate", "End Date is required").not().isEmpty(),
  ],
  createDiscount
);
module.exports = router;
