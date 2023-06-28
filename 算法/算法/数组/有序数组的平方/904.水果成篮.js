// 你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。

// 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：

// 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
// 你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
// 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
// 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。

//  

// 示例 1：

// 输入：fruits = [1,2,1]
// 输出：3
// 解释：可以采摘全部 3 棵树。
// 示例 2：

// 输入：fruits = [0,1,2,2]
// 输出：3
// 解释：可以采摘 [1,2,2] 这三棵树。
// 如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
// 示例 3：

// 输入：fruits = [1,2,3,2,2]
// 输出：4
// 解释：可以采摘 [2,3,2,2] 这四棵树。
// 如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
// 示例 4：

// 输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
// 输出：5
// 解释：可以采摘 [1,2,1,1,2] 这五棵树。


// 第一理解错了题目意思，写成了将两个出现最多次数的数字存储起来了
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
                    // right++;
                }
            } else { // 第一第二棵树相同,就一直去判断后面的树，直到找到不同的树
                while (right <= fruits.length) {
                    right++;
                    if (fruits[right] == bucketLeft) {
                        arr.push(fruits[right])
                    } else {
                        arr.push(fruits[right]);
                        bucketRight = fruits[right]; // 找到品种不同的树，就将其右篮子值改变
                        break; // 找到了一个不一样的树立马跳出当前循环
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