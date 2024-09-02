const Product = require("../models/product.model");
const Category = require("../models/category.models");
const Employee = require("../models/employee.model");
const Discount = require("../models/discount.model");
const { check, validationResult } = require("express-validator");
const cloudinary = require("../utils/cloudinaryConfig");

//function to calculate discount price based on discount type
const calculateDiscountPrice = (price, discount, discountType) => {
  if (discountType === "percentage") {
    return price - (price * discount) / 100;
  } else if (discountType === "amount") {
    return price - discount;
  }
};
//create a product with multiple images
exports.createProduct = async (req, res) => {
  var {
    name,
    description,
    price,
    quantity,
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
  }
  //get discount by discount id
  const discountObj = await Discount.findById(discount);
  const discountType = discountObj.discount_type;
  const discountAmount = discountObj.value;
  //calculate discount price based on discount type
  const discountPrice = calculateDiscountPrice(
    price,
    discountAmount,
    discountType
  );
  if (!relatedProducts) {
    relatedProducts = null;
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
    const imageUrls = imageResults.map((result) => result.secure_url);

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

//get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category")
//       .populate("createdBy")
//       .populate("discount")
//       .populate("relatedProducts");
//     res.status(200).json({ status: "success", data: products });
//   } catch (error) {
//     console.error("Error getting products:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// get all products with pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category")
      .populate("createdBy")
      .populate("discount")
      .populate("relatedProducts")
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(); // Get total number of products

    res.status(200).json({
      status: "success",
      data: products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//get a product by id
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    quantity,
    category,
    discountId,
    relatedProducts,
  } = req.body;

  const updatedBy = req.user.userId;

  // Check if name, description, price, quantity, and category are not empty
  if (!name || !description || !price || !quantity || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;
    product.relatedProducts = relatedProducts || product.relatedProducts;

    // Handle discount updates
    if (discountId) {
      const discount = await Discount.findById(discountId);
      if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
      }
      product.discount = discount._id;
      product.discountPrice = calculateDiscountPrice(
        product.price,
        discount.value,
        discount.discount_type
      );
    } else {
      product.discount = null;
      product.discountPrice = null;
    }

    product.updatedBy = updatedBy;

    await product.save();

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProductImages = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete old images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      const imageId = product.images[i].split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    // Upload new images to Cloudinary
    const imageUploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);
    const imageUrls = imageResults.map((result) => result.secure_url);

    product.images = imageUrls;

    await product.save();

    res.status(200).json({
      status: "success",
      message: "Product images updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product images:", error);
    res.status(500).json({ message: "Server error" });
  }
};
