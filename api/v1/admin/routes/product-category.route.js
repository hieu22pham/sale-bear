const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware')

const controller = require("../controllers/product-category.controller")

router.get("/", controller.index)

module.exports = router;
