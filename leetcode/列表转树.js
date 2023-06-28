
// 题目： 输入一组列表如下，转化成树形结构
// 输入：
// [
//   { id: 1, title: "child1", parentId: 0 },
//   { id: 2, title: "child2", parentId: 0 },
//   { id: 3, title: "child1_1", parentId: 1 },
//   { id: 4, title: "child1_2", parentId: 1 },
//   { id: 5, title: "child2_1", parentId: 2 }
// ]

// 输出：
// tree=[
//   {
//     "id": 1,
//     "title": "child1",
//     "parentId": 0,
//     "children": [
//       {
//         "id": 3,
//         "title": "child1_1",
//         "parentId": 1
//       },
//       {
//         "id": 4,
//         "title": "child1_2",
//         "parentId": 1
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "title": "child2",
//     "parentId": 0,
//     "children": [
//       {
//         "id": 5,
//         "title": "child2_1",
//         "parentId": 2
//       }
//     ]
//   }
// ]

function listToTree(data) {
  // 使用对象重新存储数据, 空间换时间
  let map = {};
  // treeData存储最后结果
  let treeData = [];
  // 遍历原始数据data，存到map中，id为key，值为数据
  for (let i = 0; i < data.length; i++) {
    map[data[i].id] = data[i];
  }
  // 遍历对象
  for (let i in map) {
    // 根据 parentId 找到的是父节点
    if (map[i].parentId) {
      if (!map[map[i].parentId].children) {
        map[map[i].parentId].children = [];
      }
      // 将子节点放到父节点的 children中
      map[map[i].parentId].children.push(map[i]);
    } else {
      // parentId 找不到对应值，说明是根结点，直接插到根数组中
      treeData.push(map[i]);
    }
  }
  return treeData;
}