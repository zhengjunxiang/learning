//层序遍历
// const root={

// }

// function BFS(入口坐标){
//     const queue=[]

//     queue.push(入口坐标)

//     while(queue.length){

//         const top=queue[0]
//         //访问top

//         for(检查top出发能访问到的所有的元素){
//             queue.push(从top出发能访问到的一个个的元素)
//         }

//         queue.shift()
//     }
// }

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

function BFS(root){
    const queue=[]
    queue.push(root)
    while(queue.length){
        const top=queue[0]
        console.log(top.val);

        if(top.left){
            queue.push(top.left)
        }
        if(top.right){
            queue.push(top.right)
        }


        queue.shift()
    }
}
BFS(root)