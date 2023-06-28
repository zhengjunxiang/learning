// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

// 返回 滑动窗口中的最大值 。

//  

// 示例 1：

// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
// 示例 2：

// 输入：nums = [1], k = 1
// 输出：[1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    const len=nums.length
    const res=[]
    //维护一个双端队列
    const dueue=[]
    for(let i=0;i<len;i++){
        while(dueue.length && nums[dueue[dueue.length-1]]<nums[i]){
            dueue.pop()
        }

        dueue.push(i)

        //当队头元素的索引已经被排除在滑动窗口之外时
        while(dueue.length && dueue[0]<=i-k){
            dueue.shift()
        }
        //判断滑动窗口的状态，只有在被遍历的元素个数大于k的时候，才更新数组
        if(i>=k-1){
            res.push(nums[dueue[0]])
        }
    }
    return res
};
