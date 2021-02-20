const Product = require("../models/product");
const multer = require("multer");
const shortid = require("shortid");

exports.createProduct = (req, res) => {
  res.status(200).json({ file: req.files });
};

exports.getProducts = (req, res) => {};
