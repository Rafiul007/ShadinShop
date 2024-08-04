const Employee = require("../models/employee.model");
const Category = require("../models/category.models");

// create category
exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;
  const files = req.files;
  const createdBy = req.user.userId;
  const updatedBy = req.user.userId;

  try {
    const imageUploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);

    const images = imageResults.map((result) => result.secure_url);

    const category = new Category({
      name,
      description,
      images,
      createdBy,
      updatedBy,
    });

    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const files = req.files;
  const updatedBy = req.user.userId;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (files && files.length > 0) {
      const imageUploadPromises = files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const imageResults = await Promise.all(imageUploadPromises);

      const images = imageResults.map((result) => result.secure_url);
      category.images = images; // Update array of image URLs
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.updatedBy = updatedBy;

    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
