const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
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
