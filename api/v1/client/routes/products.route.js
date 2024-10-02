const express = require('express')
const router = express.Router();

const controller = require("../controller/product.controller")

router.get("/", controller.index)
router.get("/products-feature", controller.productsFeature)

module.exports = router;
