const User = require("../../models/user.model")
const md5 = require("md5")

module.exports.register = async (req, res) => {
  try {
    console.log(req.body)
    req.body.password = md5(req.body.password)

    const user = new User(req.body)
    const data = await user.save()

    console.log(data)

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }

}