const Product = require("../models/product.model")

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const products = await Product.find(find)
  if (products.length > 0) {
    res.json({
      code: 200,
      message: "Lấy toàn bộ sản phẩm thành công!",
      products: products
    })
  }
  else {
    res.json({
      code: 400,
      message: "Không tồn tại sản phẩm nào!",
    })
  }
}

module.exports.create = async (req, res) => {
  try {
    console.log(req.body)
    const product = new Product(req.body)
    const data = await product.save()

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

module.exports.detail = async (req, res) => {
  try {
    console.log(req.body)
    const product = new Product(req.body)
    const data = await product.save()

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



