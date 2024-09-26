const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware')
const uploadCloud = require("../middlewares/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()

const controller = require("../controllers/account.controller")

router.get("/", authMiddleWare.requireAuth, controller.index)
router.post("/create", authMiddleWare.requireAuth, upload.single("avatar"), uploadCloud.upload, controller.create)
router.patch("/delete/:id", authMiddleWare.requireAuth, controller.delete)

router.post("/login", controller.login)
router.get('/verify', authMiddleWare.requireAuth, controller.verifyAccount);

module.exports = router;
