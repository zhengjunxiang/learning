// 448. 找到所有数组中消失的数字
// 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

 

// 示例 1：

// 输入：nums = [4,3,2,7,8,2,3,1]
// 输出：[5,6]
// 示例 2：

// 输入：nums = [1,1]
// 输出：[2]



var findDisappearedNumbers = function(nums) {
    var arr=[]
    for(let i=1;i<=nums.length;i++){
        if(nums.indexOf(i)===-1){
            arr.push(i)
        }
    }
    return arr
};

//就是一个一个的判断数组中有没有某个数字
