// 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

// 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

// 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

// 你所设计的解决方案必须只使用常量级的额外空间。

//  
// 示例 1：

// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。


var twoSum = function(numbers, target) {
    var index1,index2;
    for(var i=0;i<numbers.length;i++){
        var res=target-numbers[i];
        index1=i+1;
        var search=numbers.indexOf(res,i+1)
        // j++
        if(search!==-1){       //如果在数组中检索到res，那么再到该数组中检索res的位置
            for(var j=0;j<numbers.length;j++){
                if(res==numbers[j]){
                    index2=j+1;
                }
            }
            return [index1,index2]
        }
    }
};


// 1.一开始将j的位置搞错了，导致没有认识到将j放到那里会导致每次执行新的i循环，j