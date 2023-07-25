// 在尝试中寻找问题的解，过程中一旦发现不符合，就回溯返回上一层


let arr = [1, 2, 3]
// [[123],[132],[213],[231],[312],[321]]

// 1 + [2, 3, 4]

// 用递归模拟出所有的情况
// 遇到包含重复元素的情况就回溯
// 收集所有到达递归重点的情况，返回


var permute = function(nums) {
  let res = []  // [[1,2,3]]

  const fn = (path) => {
    if (path.length === nums.length) {
      res.push(path)
      return
    }

    nums.forEach(n => {  // 1 , 2,  3
      if (path.includes(n)) { 
        return
      }

      fn(path.concat(n)) // 1 + [2, 3] 全排列
    });
  }
  fn([])
  
  return res
};

console.log(permute(arr));