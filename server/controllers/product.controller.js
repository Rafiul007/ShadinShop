const Product = require("../models/product.model");
const Category = require("../models/category.models");
const Employee = require("../models/employee.model");
const cloudinary = require("../utils/cloudinaryConfig");


//function to calculate discount price based on discount type
const calculateDiscountPrice = (price, discount, discountType) => {
      if (discountType === "percentage") {
            return price - (price * discount) / 100;
      } else if (discountType === "amount") {
            return price - discount;
      }
}
//create a product with multiple images
exports.createProduct = async (req, res) => {
  var {
    name,
    description,
    price,
    quantity,
    images,
    category,
    discount,
    relatedProducts,
  } = req.body;
  const files = req.files;
  const createdBy = req.user.userId;
  const updatedBy = req.user.userId;

  //check if name, description, price, quantity and category are not empty
  if (!name || !description || !price || !quantity || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //if discount is empty set it to 0
  if (!discount) {
    discount = null;
    var discountType = "percentage";
  }
  //calculate discount price based on discount type
  const discountPrice = calculateDiscountPrice(price, discount, discountType);
  if(!relatedProducts){
        relatedProducts= null;
  }
  try {
    // Check if at least one image is uploaded
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    //check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Upload multiple images to Cloudinary
    const imageUploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);
    // Extract secure URLs from Cloudinary response
    const imageUrls = imageResults.map(result => result.secure_url);

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      quantity,
      images: imageUrls,
      category,
      discount,
      relatedProducts,
      createdBy,
      updatedBy,
    });
    await product.save();
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
