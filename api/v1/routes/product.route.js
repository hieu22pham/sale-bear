const express = require('express')
const router = express.Router();
const authMiddleWare = require('././../middlewares/auth.middleware')

const controller = require("../controllers/product.controller")

router.get("/", controller.index)
router.get("/detail/:slug", controller.detail)
router.post("/create", authMiddleWare.requireAuth, controller.create)
router.patch("/delete/:slug", authMiddleWare.requireAuth, controller.delete)

module.exports = router;
