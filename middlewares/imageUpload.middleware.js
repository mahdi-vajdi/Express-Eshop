const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "iamge/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    if (!isValid) {
      cb(new Error("Invalid image type"), "public/uploads");
    } else {
      cb(null, "public/uploads");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${file.fieldname}_${uniqueSuffix}.${extension}`);
  },
});

exports.uploadOptions = multer({ storage: storage });
