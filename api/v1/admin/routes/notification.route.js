const express = require('express')
const router = express.Router();

const controller = require("../controllers/notification.controller")

router.get("/quickOrder", controller.QuickOrder)


module.exports = router;
