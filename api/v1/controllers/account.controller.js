const Account = require("../models/account.model")
const Role = require("../models/roles.model")
const paginationHelper = require("../helpers/pagination")

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const countProduct = await Account.countDocuments(find)

  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItem: 4
  }, req.query, countProduct
  )

  const records = await Account.find(find).select("-password -token").limit(objectPagination.limitItem)
    .skip(objectPagination.skip)

  if (records && records.length > 0) {
    // Dùng map và Promise.all để cải thiện hiệu suất
    const enrichedRecords = await Promise.all(records.map(async (record) => {
      // Chuyển đổi record thành object thông thường
      const recordObject = record.toObject();

      // Tìm role tương ứng
      const role = await Role.findOne({
        _id: record.role_id,
        deleted: false
      });

      // Gán giá trị role vào record
      recordObject.role = role ? role : null; // Nếu không tìm thấy role, gán null

      return recordObject; // Trả về record đã được thêm thuộc tính role
    }));

    res.json({
      code: 200,
      message: "Lấy danh sách tài khoản thành công!",
      accounts: enrichedRecords
    });
  } else {
    res.json({
      code: 400,
      message: "Không tồn tại tài khoản nào!",
    })
  }

}

module.exports.create = async (req, res) => {

}

module.exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await Account.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    })

    return;
  }
  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    })
    return;
  }

  const token = user.token
  res.cookie("token", token)

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
  })
}