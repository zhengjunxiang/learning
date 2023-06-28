let arr=[5,4,1,2,3]  // 3
let arr2=[7,9,4,5] //5
 
const median=(nums)=>{
    nums.sort((a,b)=> a-b)
    let mid=nums.length/2

    if(mid%2 !==0){
        return nums[Math.floor(mid/2)]
    }else{
        return nums[mid/2-1]
    }
}