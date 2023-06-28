// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。

//  

// 示例 1:

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 示例 2:

// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4







var searchInsert = function(nums, target) {
    for(var i=0;i<nums.length;i++){
        if(nums[i]>=target){
            return i
        }
       else  if( nums[nums.length-1]<target){
            return nums.length
        }
        
    }

};

// 二分法
var searchInsert = function(nums, target) {
    let left=0;
    let right = nums.length-1
    while(left<=right){
        let middle = Math.floor((left + right)/2)
        if(nums[middle]>target){
            right=middle - 1
        }else if(nums[middle]<target){
            left = middle +1
        }else{
            return middle
        }
    }
    return left
 
 };

 // 这道题与二分法查找位置非常类似,也就是如果查询成功的话就返回该数组的下标,如果查询失败的话,就说明此时左右指针相等了,也就是没有查询到有这么一个数字,
 // 那么此时这个位置就是该target要插入的位置