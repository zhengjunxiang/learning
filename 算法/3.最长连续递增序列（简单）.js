// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

//  

// 示例 1：

// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。
// 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
var findLengthOfLCIS = function(nums) {
    var count=1;
    var result=0;
    if(nums.length==1){
        return nums.length
    }
    for(var i=0;i<=nums.length-1;i++){
        if(nums[i]<nums[i+1]){
            count++
        }
        else {
            count=1
        }
        result=Math.max(result,count);
    }
    return result;
};

//1.首先考虑数组长度为1的时候情况
//2.设计一个计数器与一个结果，利用遍历来找出连续递增数的个数，如果前面一个数比后面的小，那么将计数器调整为1
// 每次循环比较出计数器与结果的最大值，并且将最大值赋给结果（找出最大连续递增的个数）
// 最后返回结果