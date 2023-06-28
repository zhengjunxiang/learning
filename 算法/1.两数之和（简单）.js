// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

var twoSum = function(nums, target) {
    for(var i=0;i<nums.length;i++){
       var res=target-nums[i]
       var search=nums.indexOf(res,i+1)
       if(search !== -1){
           return [i,search]
       }
    }

    return null
};

// 2.用双指针
var twoSum = function(nums, target) {
    var length=nums.length;
    var slow=0,fast=1;
    while(slow<length){
        for(var i=fast;i<length;i++){
            if(nums[slow]+nums[i]!==target){
                continue;                     //当时想的是用goto语句跳出这个循环，直接跳出本次循环就可以了
               }
        else{
            return [slow,i];
        }
        }
        slow++
        fast++
    }
};


// 1.可以反向查找他们的差值，首先求出target与arr[i]之间的差值
// 2.在数组中检索该值（indexOf()方法如果检索失败会返回-1）如果检索值不是-1，那么检索成功