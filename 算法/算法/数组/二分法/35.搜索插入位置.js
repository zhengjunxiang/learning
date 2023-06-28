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



 // 第一将中间值的位置放错了,导致结构一直没有出现


 // 第二题
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


 

 // 求算数平方根 
 // 思路：1. x>=m的平方

 var mySqrt = function(x) {
    if(x==1) return 1
    if(x==0) return 0
    let min=0;
    let max=x;
    let res=-1
    while(min<=max){
        let middle=Math.round((max+min)/2)
        if(middle*middle<=x){
            res=middle
            min=middle+1
            
        }else{
            max=middle-1
        }
    }
     return res
};

// 只要左边界值小于等于右边界值，那么就一直去判断它们的中间值的平方与x值的大小，如果大了就缩小右边界的值，否则增大左边界的值
// 直到左边界小于等于右边界的值，那么就一定会判断出



