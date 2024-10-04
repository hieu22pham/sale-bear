const express = require('express')
const router = express.Router();

const controller = require("../controllers/notification.controller")

router.get("/getQuickOrder", controller.GetQuickOrder)
router.post("/postQuickOrder", controller.PostQuickOrder)

module.exports = router;
