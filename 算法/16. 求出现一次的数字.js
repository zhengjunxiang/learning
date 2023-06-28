// 136. 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

// 说明：

// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

// 示例 1:

// 输入: [2,2,1]
// 输出: 1
// 示例 2:

// 输入: [4,1,2,1,2]
// 输出: 4

var singleNumber = function (nums) {
    var obj = {}
    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]] >= 1) {
            obj[nums[i]]++
        } else {
            obj[nums[i]] = 1
        }
    }
    for (let key in obj) {
        if (obj[key] === 1) {
            return key
        }
    }
};

//将数组中出现的数字转化成对象的key值，然后每出现一次将其value++