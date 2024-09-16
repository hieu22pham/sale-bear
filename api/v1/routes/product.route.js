const express = require('express')
const router = express.Router();

const controller = require("../controllers/product.controller")

router.get("/", controller.index)
router.get("/detail/:slug", controller.detail)
router.post("/create", controller.create)

module.exports = router;
