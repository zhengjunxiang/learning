//  34. 在排序数组中查找元素的第一个和最后一个位置
// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

 

// 示例 1：

// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]

var searchRange = function(nums, target) {
    let rightBorder=getRightBorder(nums, target)
    let leftBorder=getLeftBorder(nums, target)
 
    if(rightBorder ==-2 || leftBorder==-2){
        return [-1,-1]
    }else if(rightBorder-leftBorder>1) return [leftBorder+1,rightBorder-1]
    return [-1,-1]
 
 };
 
 let getRightBorder=function(nums, target){
     let left=0;
     let rightBorder=-2
     let right= nums.length-1
     while(left<=right){   // 当右边界大于左边界
         let middle = Math.floor((left+right)/2)  // 取中间值
         if(nums[middle]>target){   // 如果中间值大于目标值
             right=middle-1  // 那么就将右边界挪到中间这个值上
         }else{      
             left= middle+1   // 否则就将左边界改变
             rightBorder=left   // 因为如果目标值大于等于中间值，此时满足左边界小于右边界，那么我们就接着去找改变了左边界的新范围里面的中中间值
             // 就比如现在在 8，8，10范围内去找中间值 如果目标值小于等于中间值，那么就将左边界赋在第二个8上面，此时就是两个8的右边界
         }
     }
      return rightBorder
 }
 
 let getLeftBorder=function(nums,target){
     let left=0;
     let leftBorder=-2
     let right =nums.length-1
     while(left<=right){
         let middle=Math.floor((left+right)/2)
         if(nums[middle]>=target){
             right=middle-1
             leftBorder=right
         }else{
             left = middle+1
         }
     }
     return leftBorder
 }

 // 本题是利用二分法分别找出target的左右区间
 // 其实无非三种情况
 // 第一种：target值不在nums的范围值里面
 // 第二种：target值在范围内，但是nums里面匹配不到这个target
 // 第三种：在nums里面存在target值