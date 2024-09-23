const express = require('express')
const router = express.Router();
const authMiddleWare = require('././../middlewares/auth.middleware')

const controller = require("../controllers/account.controller")

router.get("/", authMiddleWare.requireAuth, controller.index)
router.post("/create", authMiddleWare.requireAuth, controller.create)
router.post("/login", controller.login)
router.get('/verify', authMiddleWare.requireAuth, controller.verifyAccount);

module.exports = router;
