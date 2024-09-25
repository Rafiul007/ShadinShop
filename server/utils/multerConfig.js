const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // List of allowed MIME types for images
  const allowedMimeTypes = /image\/(jpeg|jpg|png|gif|webp|bmp|tiff|svg\+xml)/;

  // Check if the file's MIME type is in the allowed list
  if (allowedMimeTypes.test(file.mimetype)) {
    return cb(null, true);
  } else {
    cb("Error: Only image files are allowed!");
  }
};

// For single image upload
const uploadSingle = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit per file
  fileFilter,
}).single('image'); // Field name should match the form data field name


//upload multiple
const uploadMultiple = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit per file
  fileFilter,
}).array('images', 5);  // Handle multiple files, max 5 files

module.exports = { uploadMultiple,uploadSingle };
