const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../helpers/createTree");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);

  // Create a tree structure from the records
  const newRecords = createTreeHelper.tree(records);
  if (newRecords) {
    console.log("newRecords data: ", JSON.stringify(newRecords, null, 2)); // Log formatted output for better readability
    res.json({
      code: 200,
      message: "Lấy toàn bộ sản phẩm thành công!",
      categories: newRecords
    });
  }
};
