// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

//  

// 示例 1:

// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 示例 2:

// 输入: nums = [0]
// 输出: [0]
//  

// 提示:

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1
//  

// 双指针法
var moveZeroes = function(nums) {
    let slow=0;
    for(let fast=0;fast<nums.length;fast++){
        if(nums[fast]!=0){
            nums[slow]=nums[fast]
            slow++
        }
    }
    while(slow<nums.length){
        nums[slow]=0
        slow++
    }
   
    return slow
};

// 首先将非零晒选出来，然后在非零后面的位置上设置0

var moveZeroes = function(nums) {
    for(let i=0;i<nums.length;i++){
        if(nums[i]===0){
            nums.push(nums.splice(i,1))
            i--
        }
    }
    return nums
};

//思路就是循环判断这个数组某位上的数字是不是0，如果是0就把这个0切下来然后添加到数组末尾，同时要把循环的数字减1(因为切割数组会改变这个数组)