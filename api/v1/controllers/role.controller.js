const Role = require("../models/roles.model")

module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false
    }

    const roles = await Role.find(find);

    if (roles.length > 0) {
      res.json({
        code: 200,
        message: "Lấy toàn bộ quyền thành công!",
        roles: roles
      })
    } else {
      res.json({
        code: 400,
        message: "Không tồn tại quyền nào!",
      })
    }
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: "Lỗi server!"
    });
  }

}

module.exports.create = async (req, res) => {
  try {
    console.log(req.body)
    const role = new Role(req.body)
    const data = await role.save()

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

module.exports.permissions = async (req, res) => {
  try {
    const find = {
      deleted: false
    }

    const roles = await Role.find(find);
    console.log('roles: ', roles)

    if (roles) {
      res.json({
        code: 200,
        message: "Lấy toàn bộ quyền thành công!",
        roles: roles
      })
    } else {
      res.json({
        code: 400,
        message: "Không tồn tại quyền nào!",
      })
    }
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: "Lỗi server!"
    });
  }
}

module.exports.updatePermissions = async (req, res) => {
  try {
    const permissions = req.body.permissions
    console.log("permissions: ", permissions)
    const roles = []
    for (const item of permissions) {
      console.log("item: ", item)
      console.log("item per: ", item.permissions)

      const data = await Role.updateOne({ _id: item.id }, { permissions: item.permissions })
      roles.push(data)
    }

    res.json({
      code: 200,
      message: "Cập nhật permission thành công!",
      roles: roles
    })
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: "Lỗi server!"
    });
  }


}


