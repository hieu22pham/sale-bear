const User = require("../../models/user.model");
const md5 = require("md5");

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email
    const username = req.body.username
    console.log(email)
    console.log(username)

    // Check if email already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.json({
        code: 400,
        message: "Đã tồn tại email!",
      });
    }

    // Check if username already exists
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.json({
        code: 401,
        message: "Đã tồn tại username!",
      });
    }

    // Hash password and create new user
    if (!existEmail && !existUsername) {
      req.body.password = md5(req.body.password);

      const user = new User(req.body);
      const data = await user.save();

      console.log(data);

      return res.json({
        code: 200,
        message: "Tạo thành công!",
        data: data,
      });
    }

  } catch (e) {
    console.error(e);  // Log the error for debugging
    return res.json({
      code: 500,
      message: "Đã xảy ra lỗi khi tạo người dùng!",
    });
  }
};
