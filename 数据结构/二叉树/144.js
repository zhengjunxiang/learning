var preorderTraversal = function(root) {
    let res=[]
    function preorder(root){
        if(!root) return
        res.push(root.val)
    preorderTraversal(root.left)
    preorderTraversal(root.right)
    }
    preorder(root)
    return res
};