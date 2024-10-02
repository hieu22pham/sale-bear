const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const products = await Product.find(find)
  const newProducts = []

  products.map((item) => {
    if (item.title != null) {
      newProducts.push(item)
    }
  })

  if (products.length > 0) {
    res.json({
      code: 200,
      message: "Lấy toàn bộ sản phẩm thành công!",
      products: newProducts
    })
  }
  else {
    res.json({
      code: 400,
      message: "Không tồn tại sản phẩm nào!",
    })
  }
}

module.exports.productsFeature = async (req, res) => {
  const productsFeature = await Product.find({
    deleted: false,
    featured: 1
  });

  if (productsFeature) {
    console.log("productsFeature data: ", JSON.stringify(productsFeature, null, 2)); // Log formatted output for better readability
    res.json({
      code: 200,
      message: "Lấy toàn bộ sản phẩm thành công!",
      productsFeature: productsFeature
    });
  }
}
