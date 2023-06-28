const add = (a, b, c) => a + b + c
const a = currying(add, 1)
let b = a(2)

console.log(b(3)); // 6

function currying(fn, ...args) {
  const length = fn.length
  let allArgs = [...args]

  const res = (...args2) => {
    allArgs = [...allArgs, ...args2]
    if (allArgs.length === length) {
      return fn(...allArgs)
    } else {
      return res
    }
  }

  return res

  // if (allArgs.length === length) {
  //   return fn(...allArgs)
  // } else {
  //   return (...args2) => {
  //     allArgs = [...allArgs, ...args2]
  //     return fn(...allArgs)
  //   }
  // }
}