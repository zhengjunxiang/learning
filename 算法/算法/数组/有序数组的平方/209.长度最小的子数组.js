// 给定一个含有 n 个正整数的数组和一个正整数 target 。

// 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

//  

// 示例 1：

// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
// 示例 2：

// 输入：target = 4, nums = [1,4,4]
// 输出：1
// 示例 3：

// 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
// 输出：0

// 既然是在这个数组里面找一个满足条件的最小子数组的长度，要不就是长度为1；要不就是不存在；要不就是其他长度
// 如果刚好有某个数满足条件：那么最短长度就一定为1；否则就可以从数组第一个值来累加，直到该子数组满足条件；满足的话将此时的长度存储到一个数组里面
// 那么这个长度就一定是以该值开始的最短长度；然后再将左指针往右移动一个重复，最后判断数组里面的值

var minSubArrayLen = function (target, nums) {
    let left = 0;
    let right = 1;
    let result = nums[0];
    let arr = [] // 用来存储满足条件的值
    while (left <= nums.length - 1 && right <= nums.length) {
        if (result >= target) {  // 排除第一个大于目标值的情况
            return 1;
        } else {
            result += nums[right];
            if (result >= target) {
                arr.push(right - left + 1);
                left++;
                right = left + 1;
                result = nums[left];
            } else {
                right++;
            }
        }
    }
    console.log(arr)
    if (arr.length === 0) {
        return 0
    } else {
        return Math.min(...arr)
    }
};


var totalFruit = function (fruits) {
    let left = 0;
    let right = 1;
    let arr = [];
    let length = 0;
    if (fruits.length === 2) {
        return 2;
    }
    while (left < fruits.length - 1) {
        let bucketLeft = fruits[left];
        let bucketRight = fruits[right];
        arr.push(bucketLeft);
        arr.push(bucketRight);
        while (right <= fruits.length) {
            if (bucketLeft != bucketRight) {  // 如果第一第二棵树不相同
                right++;
                if (fruits[right] == bucketRight || fruits[right] == bucketLeft) {
                    arr.push(fruits[right]);
                    right++;
                }
            } else { // 第一第二棵树相同,就一直去判断后面的树，直到找到不同的树
                while (right <= fruits.length) {
                    right++;
                    if (fruits[right] == bucketLeft) {
                        arr.push(fruits[right])
                    } else {
                        bucketRight = fruits[right]; // 找到品种不同的树，就将其右篮子值改变
                    }
                }
            }
        }
        if (length > arr.length) {
            length = length;
        } else {
            length = arr.length;
        }
        left++;
        right = left + 1;
        arr = [];  // 将数组置零
    }
   return length;  
};