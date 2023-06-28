// function treeLeftVal(root) {
//   if (!root) return [];
//   let stack = [root], ret = [root.val], t = stack.pop();
//   while(t) {
//     if (t.right) stack.push(t.right);
//     if (t.left) {
//       stack.push(t.left);
//       ret.push(t.left.val);
//     }
//     t = stack.pop();
//   }
//   return ret;
// }

// function treeLeftVal(root) {
//   var stack = [root], ret = [root.val], t = stack.pop();
//   while(t) {
//     if (t.right) stack.push(t.right);
//     if (t.left) {
//       stack.push(t.left);
//       ret.push(t.left.val);
//     }
//     t = stack.pop();
//   }
//   return ret;
// }

// function treeLeftVal(root) {
//   var stack = [root], ret = [], t = stack.pop();
//   while(t) {
//     if (t.right) stack.push(t.right);
//     if (t.left) {
//       stack.push(t.left);
//       ret.push(t.left.val);
//     }
//     t = stack.pop();
//   }
//   return ret;
// }

// function treeLeftVal(root) {
//   var stack = [root], ret = [], t = stack.pop();
//   while(t) {
//     if (t.right) stack.push(t.right);
//     if (t.left) {
//       stack.push(t.left);
//       ret.push(t.left.val);
//     }
//     t = stack.pop();
//   }
//   return ret;
// }

function treeLeftVal(root) {
  let stack = [], ret = [], t = root;
  while(t) {
    if (t.right) stack.push(t.right);
    if (t.left) {
      stack.push(t.left);
      ret.push(t.left.val);
    }
    t = stack.pop();
  }
  return ret;
}

let tree = {
  val: 2,
  left: {
    val: 1,
    left: {
      val: 4,
      right: {
        val: 10
      }
    },
    right: {
      val: 5,
      left: {
        val: 11
      }
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val:12
      }
    },
    right: {
      val: 7,
      left: {
        val:13
      }
    }
  },
}

console.log(treeLeftVal(tree))


