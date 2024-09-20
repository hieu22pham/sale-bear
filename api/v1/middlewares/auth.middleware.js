const Account = require("../models/account.model")

module.exports.requireAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")
      console.log(token[1])

      const user = await Account.findOne({
        token: token,
        deleted: false
      }).select("-password")

      if (!user) {
        res.json({
          code: 401,
          message: "Token không hợp lệ!"
        })

        return;
      }

      req.user = user
      next()
    }
    else {
      res.json({
        code: 400,
        message: "Vui lòng gửi kèm token!"
      })
    }
  } catch (error) {
    res.json({
      code: 404,
      message: "Lỗi hệ thống"
    })
  }
}