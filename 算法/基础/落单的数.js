let arr = [1,2,2,1,3,3,4]   // 4

const single=(nums)=>{
    let map =new Map()

    for(let i of nums.keys()){
        if(!map.has(nums[i])){
            map.set(nums[i],1)
        }else{
            map.delete(nums[i])
        }
    }
        return map.values()
}

console.log(single(arr));