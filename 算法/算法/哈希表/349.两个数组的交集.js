// 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

//  

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]
// 解释：[4,9] 也是可通过的

思路:用set这个特殊的数据结构

var intersection = function(nums1, nums2) {
    const s1=new Set();
    const s2=new Set();
    nums1.forEach(x=>s1.add(x));
    nums2.forEach(x=>s2.add(x));


    let res= [...s1].filter(x=>s2.has(x));
    return res
};