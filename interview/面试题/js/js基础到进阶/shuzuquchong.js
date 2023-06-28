// 1.set去重
var arr=[1,1,1,2,2,3]

function qc(arr){
    return [...new Set(arr)]
}

// 2.
function qc(){
    const newArr=[]

    arr.reduce((pre,next)=>{
        if(!pre.has(next)){
            pre.set(next,1)
            newArr.push(next)
        }
        return pre
    },new Map())
    return newArr
}
// reduce  接收两个参数，第二个参数用来代表 pre 的值