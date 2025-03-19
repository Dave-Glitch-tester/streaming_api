//Function to dynamically create directory if it doesn't exist
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = `./uploads/profilephotos`;
    createFolderIfNotExists(uploadFolder);
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    // Add timestamp and original file extension for uniqueness
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file types. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// Limit file size to 5MB
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Middleware to handle errors
const uploadError = (req, res, next) => {
  uploads.single("profilephoto")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        return res.status(400).json({ error: err.message });
      }
      // Handle custom errors
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = { uploads, uploadError };
