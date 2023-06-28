// 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，
// 返回删除后数组的新长度。元素的 相对顺序 应该保持一致 。

// 由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，
// 那么 nums 的前 k 个元素应该保存最终结果。

// 将最终结果插入 nums 的前 k 个位置后返回 k 。

// 不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

// 判题标准:

// 系统会用下面的代码来测试你的题解:

// int[] nums = [...]; // 输入数组
// int[] expectedNums = [...]; // 长度正确的期望答案

// int k = removeDuplicates(nums); // 调用

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// 如果所有断言都通过，那么您的题解将被 通过。


var removeDuplicates = function(nums) {
    var slow=1,fast=1;
       length=nums.length;
       if(length==0){
           return 0;
       }
       while(fast<length){
           if(nums[fast]>nums[fast-1]){
               nums[slow]=nums[fast];
               slow++;
           }
           fast++;
       }
       return slow;
   };


// 1.使用双指针slow fast
// 2.首先判断数组长度是否为0
// 3.设置两个指针slow与fast都指向1，当fast值小于length,判断arr[fast]与它前面一个元素的大小（这样就可以判断出第一个元素）
// 4.如果大小成立那么将arr[fast]的值赋给arr[slow]的值，再使slow++,再使fast++
// 5.最后输出slow