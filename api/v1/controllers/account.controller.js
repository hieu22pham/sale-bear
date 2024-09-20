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

  if (records) {
    for (const record of records) {
      const role = await Role.findOne(
        {
          _id: record.role_id,
          deleted: false
        })

      record.role = role
    }

    res.json({
      code: 200,
      message: "Lấy danh sách tài khoản thành công!",
      data: records
    })
  } else {
    res.json({
      code: 400,
      message: "Không tồn tại tài khoản nào!",
    })
  }

}

module.exports.create = async (req, res) => {

}