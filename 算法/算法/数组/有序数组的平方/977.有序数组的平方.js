// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

//  

// 示例 1：

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]
// 示例 2：

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]


var sortedSquares = function(nums) {
    let left=0;
    let right=nums.length-1;
    let arr=[]
    while(left<=right){
        if(nums[left]*nums[left]>nums[right]*nums[right]){
            arr.unshift(nums[left]*nums[left])
            left++
        }else{
            arr.unshift(nums[right]*nums[right])
            right--
        }
    }
    return arr
};

// 一开始想到的是暴力破解，使用双指针时间复杂度降低了，就是最大值不在左边就在右边；只要一直比较左右两边的大小就可以