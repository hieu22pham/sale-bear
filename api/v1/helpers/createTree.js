let count = 0;

function createTree(arr, parentId = "") {
  const tree = []
  arr.forEach(item => {
    if (item.parent_id === parentId) {
      count++
      const newItem = item
      item.index = count;
      const children = createTree(arr, item.id)
      if (children.length > 0) {
        item.children = children
      }

      tree.push(newItem)
    }
  });

  return tree;
}

module.exports.tree = (arr, parentId = "") => {
  count = 0;
  const tree = createTree(arr, parentId = "")

  return tree;
}