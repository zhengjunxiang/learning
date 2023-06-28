// 哈希表

const toSum=()=>{
    let map={}
     
    for(let i=0;i<nums.length;i++){
        let num=nums[i]
        if(map[num]!==undefined){
            return [map[num],i]
        }else{
            map[target-num]=i
        }
    }
    
}