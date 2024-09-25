const Product = require("../models/product.model");
const Category = require("../models/category.models");
const Employee = require("../models/employee.model");
const Discount = require("../models/discount.model");
const Size = require("../models/size.model"); // Import Size model
const { check, validationResult } = require("express-validator");
const cloudinary = require("../utils/cloudinaryConfig");

// Function to calculate discount price based on discount type
const calculateDiscountPrice = (price, discount, discountType) => {
  if (discountType === "percentage") {
    return price - (price * discount) / 100;
  } else if (discountType === "amount") {
    return price - discount;
  }
};

// Create a product with multiple images
exports.createProduct = async (req, res) => {
  var { name, description, price, sizes, category, discount, relatedProducts } =
    req.body;
  const files = req.files;
  const createdBy = req.user.userId;

  // Check if name, description, price, sizes, and category are not empty
  if (!name || !description || !price || !sizes || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // If discount is empty, set it to null
  if (!discount) {
    discount = null;
  }

  // Get discount details if applicable
  const discountObj = await Discount.findById(discount);
  const discountType = discountObj ? discountObj.discount_type : null;
  const discountAmount = discountObj ? discountObj.value : null;
  const discountPrice = discountType
    ? calculateDiscountPrice(price, discountAmount, discountType)
    : null;

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

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Upload multiple images to Cloudinary
    const imageUploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);
    const imageUrls = imageResults.map((result) => result.secure_url);

    // Create and save the product
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      images: imageUrls,
      category,
      discount,
      relatedProducts,
      createdBy,
    });

    // Save sizes and link to the product
    if (sizes && sizes.length > 0) {
      const sizeIds = await Promise.all(
        sizes.map(async (size) => {
          const sizeObj = new Size({
            size: size.size,
            quantity: size.quantity,
            product: product._id,
          });
          const savedSize = await sizeObj.save();
          return savedSize._id; // Collect size ID after saving
        })
      );
      product.size = sizeIds; // Assign the array of size IDs to the product
    }

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

// Get all products with pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category")
      .populate("createdBy")
      .populate("discount")
      .populate("relatedProducts")
      .populate("size")
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

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

// Get a product by id
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("category")
      .populate("createdBy")
      .populate("discount")
      .populate("relatedProducts")
      .populate("size"); // Populate size field

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    sizes,
    category,
    discountId,
    relatedProducts,
  } = req.body;
  console.log("req.body: ", req.body);
  const updatedBy = req.user.userId;

  try {
    // Find the product to update
    const product = await Product.findById(id)
      .populate("discount")
      .populate("size")
      .populate("relatedProducts");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields only if they are provided
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (relatedProducts !== undefined)
      product.relatedProducts = relatedProducts;

    // Handle discount updates
    if (discountId !== undefined) {
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
        // If discountId is explicitly null, remove the discount
        product.discount = null;
        product.discountPrice = null;
      }
    }

    product.updatedBy = updatedBy;

    // Update or add sizes only if provided, otherwise keep existing sizes
    if (sizes !== undefined && sizes.length > 0) {
      // Remove existing sizes associated with the product
      await Size.deleteMany({ product: product._id });

      // Add new sizes
      const sizePromises = sizes.map(async (size) => {
        const sizeObj = new Size({
          size: size.size,
          quantity: size.quantity,
          product: product._id,
        });
        return sizeObj.save();
      });
      await Promise.all(sizePromises);

      // Update product's sizes reference
      const sizeIds = (await Size.find({ product: product._id })).map(
        (size) => size._id
      );
      product.size = sizeIds;
    } else if (sizes === undefined) {
      // If sizes is not provided, keep existing sizes
      product.size = product.size;
    } else {
      // If sizes is explicitly an empty array, clear sizes
      product.size = [];
    }

    // Save product with updated fields
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

// Update product images
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

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all sizes associated with this product
    await Size.deleteMany({ product: product._id });

    res.status(200).json({
      status: "success",
      message: "Product and associated sizes deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
