const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createProduct, getProducts } = require("../controller/product");

router.post(
  "/product/create",
//   requireSignin,
//   adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/product/getproduct", getProducts);

module.exports = router;
