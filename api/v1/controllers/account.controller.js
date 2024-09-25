const Account = require("../models/account.model")
const Role = require("../models/roles.model")
const paginationHelper = require("../helpers/pagination")
const md5 = require("md5")

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

module.exports.verifyAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Vui lòng gửi kèm token!" });
    }

    const token = authHeader.split(" ")[1]; // 'Bearer token_value'

    const account = await Account.findOne({ token: token, deleted: false }).select("-password");

    if (!account) {
      return res.status(401).json({ message: "Token không hợp lệ hoặc tài khoản đã bị xóa!" });
    }

    // Tìm role tương ứng của tài khoản
    const role = await Role.findOne({ _id: account.role_id, deleted: false });

    res.json({
      code: 200,
      message: "Xác nhận tài khoản thành công!",
      account: {
        _id: account._id,
        avatar: account.avatar,
        email: account.email,
        role: role ? role.name : null,
        permissions: role ? role.permissions : null
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
  }
};

module.exports.create = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Vui lòng gửi kèm token!" });
    }

    console.log(req.body)
    const account = new Account(req.body)
    const data = await account.save()

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
    token: token
  })
}