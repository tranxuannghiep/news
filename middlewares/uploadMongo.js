const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const fileFilter = (req, file, cb) => {
  // check extension truoc khi upload
  const allowExtensions = [".jpg", ".png", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtensions.join("|")})$`, "i");
  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("File extension is not allow"), false);
  }
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: `${crypto.randomBytes(32).toString("hex")}${path.extname(
        file.originalname
      )}`,
      bucketName: process.env.BUCKET_NAME,
    };
  },
});

const uploadMongo = multer({ storage, fileFilter });
module.exports = uploadMongo;
