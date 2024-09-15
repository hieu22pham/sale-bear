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