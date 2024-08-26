const Product = require("../models/product.model");
const Category = require("../models/category.models");
const Employee = require("../models/employee.model");
const cloudinary = require("../utils/cloudinaryConfig");

const Discount = require("../models/discount.model");
//create a discount
exports.createDiscount = async (req, res) => {
  const { name, description, discount_type, value, start_date, end_date } =
    req.body;
    console.log(req.body)
    const userId = req.user.userId
  const discount = new Discount({
    name,
    description,
    discount_type,
    value,
    start_date,
    end_date,
    createdBy: userId,

  });
  await discount
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};
