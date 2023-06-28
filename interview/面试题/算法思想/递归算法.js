let arr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// 1. 明确函数要做什么
// 2. 明确地推的出口
// 3. 找到函数的等价关系式

function fib(n) {
  if (n === 1 || n === 2) {
    return 1
  }

  return fib(n-1) + fib(n-2)
}


// 尾递归 --- 在函数中最后一个操作是调用函数
function tailFib(n, a = 0, b = 1, c = 1) {
  console.log(n, a, b, c);
  if (n <= 0) return n 
  if (n === 2) return c
 
  return tailFib(n-1, b, c, (b + c))

  // tailFib(9, 1, 1, 2)
  // tailFib(8, 1, 2, 3)  上上  上  当前
  // tailFib(7, 2, 3, 5)
  // tailFib(6, 3, 5, 8)
  // tailFib(5, 5, 8, 13)
  // tailFib(4, 8, 13, 21)
  // tailFib(3, 13, 21, 34)
  // tailFib(2, 21, 34, 55) // 55
}

console.log(tailFib(10));

