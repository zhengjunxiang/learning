//双端队列  滑动窗口最大值     ----允许在队列的两端进行插入和删除的队列
//这种题目绝大多数都要用双指针

let nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

var maxSlidingWindow = function (nums, k) {
    const len = nums.length
    const res = []
    let left = 0, right = k - 1
    while (right < len) {
        //找出窗口内的最大值
        function calMax(arr, left, right) {
            let t = arr[left]
            for (let i = left; i <= right; i++) {
                t = arr[i] > t ? arr[i] : t
            }
            return t
        }
        const max = calMax(nums, left, right)
        res.push(max)
        left++
        right++
    }
    return res
};


//使用栈的方法（线性时间复杂度）
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