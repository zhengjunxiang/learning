let arr = [0, 0, 0, 0, 0, 4, 4, 0]  // [0,0,0,0,0]   //4 
// 不能开辟新的内存空间
//   不能边循环数组，边修改数组

const removeElement = (arr, target) => {
    for (let i = 0; i < arr.length;) {
        if (arr[i] === target) {
            arr.splice(i, 1)
        } else {
            i++
        }
    }
    return arr
}

console.log(removeElement(arr, 4));



const remove=(arr,target)=>{
    let num=arr.length
    for(let i=0;i<num;i++){
        let find=arr.indexOf(target)
        if(find!==-1){
            arr.splice(find,1)
        }
    }
    return arr
}