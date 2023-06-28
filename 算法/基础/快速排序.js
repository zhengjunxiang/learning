// 快速排序
// function quickSort(arr) {
//   if(arr.length <= 1) return arr;
//   let left = [], right = [], cur = arr.splice(0,1);
//   for(var i = 0; i < arr.length; i++) {
//     if (arr[i] > cur) right.push(arr[i]);
//     else left.push(arr[i]);
//   }
//   return quickSort(left).concat(cur, quickSort(right));
// }

// function quickSort(arr) {
//   if (arr.length < 2) return arr;
//   var left = [], right = [], cur = arr.shift();
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > cur) right.push(arr[i]);
//     else left.push(arr[i]);
//   }
//   return quickSort(left).concat(cur, quickSort(right));
// }

// function quickSort(arr) {
//   if (arr.length < 2) return arr;
//   const left = [], right = [], target = arr.shift();
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > target) right.push(arr[i]);
//     else left.push(arr[i]);
//   }
//   return quickSort(left).concat(target, quickSort(right));
// }

// function quickSort(arr) {
//   if (arr.length <= 1) return arr;
//   const current = arr.shift(), left = [], right = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > current) right.push(arr[i]);
//     else left.push(arr[i]);
//   }
//   return quickSort(left).concat(current, quickSort(right));
// }

// function quickSort(arr) {
//   if (arr.length <= 1) return arr;
//   const current = arr.shift(), left = [], right = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < current) left.push(arr[i]);
//     else right.push(arr[i]);
//   }
//   return quickSort(left).concat(current, quickSort(right));
// }

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const current = arr.shift(), left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return quickSort(left).concat(current, quickSort(right));
}

function quickSort(arr) {
  if (arr.length < 2) return arr;
  const current = arr.shift(), left = [], right = [];
  arr.forEach(item => {
    if (item < current) left.push(item)
    else right.push(item)
  });
  return quickSort(left).concat(current, quickSort(right))
}

var arr = quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]);

console.log(arr)
