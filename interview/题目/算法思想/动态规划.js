// 和分治的区别：分治是寻找相互独立的子问题，动态规划是寻找相互重叠的子问题

// n阶楼梯，每次爬1~2个，有几种爬法
// 5 
// 11111
// 1211
// 1121
// 1112
// 2111
// 122
// 212
// 221

// const climbStairs = function(n) {
//   function item(n) {
//     if (n === 1) return 1
//     if (n === 2) return 2
//     return item(n-1) + item(n-2)
//   }
//   return item(n)
// }


// const climbStairs = function(n) {
//   let dp = [0, 1, 2]
//   for (let i = 3; i <= n; i++) {
//     dp[i] = dp[i-1] + dp[i-2]
//   }
//   return dp[n]
// }


// const climbStairs = function(n) {
//   if (n === 1) return 1
//   if (n === 2) return 2

//   let a = 1, //一阶楼梯
//       b = 2
//       // c;
//   for (let i = 3; i <= n; i++) {
//     // c = a + b
//     // a = b
//     // b = c
//     [a, b] = [b, b + a]
//   }
//   return b
// }



// f(x) = f(x-1) + f(x-2)


console.log(climbStairs(6));