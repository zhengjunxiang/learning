const root = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: 'C',
        left: {
            val: 'F'
        },
        right: {
            val: 'G'
        }
    }
}

//编写一个递归函数  先序
// function preorder(root){
//     if(!root) return
//     console.log('当前遍历到的节点值是：'+root.val);
//     preorder(root.left)
//     preorder(root.right)
// }
// preorder(root)


//中序
// function inorder(root){

//     if(!root) return

//     inorder(root.left)
//     console.log('当前遍历到的节点值是：'+root.val);
//     inorder(root.right)



// }
// inorder(root)

//后序
// function postorder(root){

//     if(!root) return

//     postorder(root.left)
//     postorder(root.right)
//     console.log('当前遍历到的节点值是：'+root.val);

// }
// postorder(root)

//层序遍历
var preorderTraversal = function (root) {
    //将根节点入栈
    //取出栈顶的节点，将值push进结果数组
    //如果栈顶的节点有右子树，我们就将右子树的值入栈
    //如果栈顶的节点有左子树，我们就将左子树的值入栈
    const arr = []
    if(!root) return res

    const stack = []
    stack.push(root)

    while (stack.length) {
        const cur = stack.pop()
        arr.push(cur.val)
        if (cur.right) {
            stack.push(cur.right)
        }
        if (cur.left) {
            stack.push(cur.left)
        }

    }
    return arr
};