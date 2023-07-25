// 找问题的最小重要性
let arr = [1, 3, 2, 6, 9, 4, 5, 7]  // 归并排序

// 1. 分，讲一个问题划分为多个相同的子问题
// 2. 解，用递归的方式去解决每个子问题
// 3. 合，把所有子问题的解决结果合并起来，得到原问题的解


function merge_sort(arr) {
  if (arr.length == 1) return arr

  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  
  return Merge(merge_sort(left), merge_sort(right))
}

const Merge = function(a, b) { // [1, 3], [2, 6], [4, 9], [5, 7]
  // console.log(a);
  let n = a && a.length ;   // [1, 2, 3, 6]
  let m = b && b.length     // [4, 5, 7, 9]
  let c = [], i = 0, j = 0;   [1, 2, 3, 4, 5, 6, 7, 9]
  while (i < n && j < m) {
    if (a[i] < b[j]) {
      c.push(a[i])
      i++
    } else {
      c.push(b[j])
      j++
    }
  }

  while(i < n) {
    c.push(a[i++])
  }

  while(j < m) {
    c.push(b[j++])
  }

  return c
}



merge_sort(arr)