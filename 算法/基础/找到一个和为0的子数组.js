let arr = [-1, -2, 3, 2, -2]   // [-1, -2, 3]  ,[2, -2]


const sub=(nums)=>{
    for (let i=0;i<nums.length;i++){
        let res= nums[i]

        for(let j=i+1;j<nums.length;j++){
            res=res+nums[j]
            if(res===0){
              return [i,j]
            }
        }

        return [-1,-1]
    }
}

console.log(sub(arr));