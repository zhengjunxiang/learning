console.log(1)
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
});
console.log(4)
new Promise((resolve,reject) => {
  console.log(5)
  resolve()
}).then(() => {
  console.log(6)
  setTimeout(() => {
    console.log(7)
  })
})
console.log(8)
// 1 4 5 8 6 2 3 7