var levelOrder = function(root) {
    const res=[]
    if(!root) return res

    const queue=[]
    queue.push(root)
    while(queue.length){
        const level=[]//用来存储当前一层数组
        const len=queue.length
        for(let i=0;i<len;i++){
            const top=queue.shift()
            level.push(top.val)
            if(top.left){
                queue.push(top.left)
            }
            if(top.right){
                queue.push(top.right)
            }
        }


        re1.push(level)
    }
    return res
};