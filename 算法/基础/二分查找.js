// function binaryFind(arr, target) {
//   var low = 0, high = arr.length-1, mid;
//   while (low <= high) {
//     mid = Math.floor((low+high)/2);
//     if (target === arr[mid]) return mid;
//     if (target > arr[mid]) low = mid+1;
//     else high = mid-1;
//   }
//   return -1;
// }

// function binaryFind(arr, target) {
//   var low = 0, high = arr.length-1, mid;
//   while(low <= high) {
//     mid = Math.floor((low+high)/2);
//     if (arr[mid] === target) return mid;
//     if (arr[mid] > target) high = mid - 1;
//     else low = mid + 1;
//   }
//   return -1;
// }

// function binaryFind(arr, target) {
//   let mid = 0, left = 0, right = arr.length-1;
//   while(left <= right) {
//     mid = Math.floor((left+right)/2);
//     if (arr[mid] === target) return mid;
//     if (arr[mid] > target) right = mid-1;
//     else left = mid+1
//   }
//   return -1;
// }

// function binaryFind(arr, target) {
//   let mid = 0, left = 0, right = arr.length - 1;
//   while(left <= right) {
//     mid = (left+right) >>> 1;
//     if (target === arr[mid]) return mid;
//     if (target > arr[mid]) left = mid + 1;
//     else right = mid - 1;
//   }
//   return -1;
// }

function binaryFind(arr, target) {
  let mid = 0, left = 0, right = arr.length - 1;
  while(left <= right) {
    mid = (left+right) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
}

function binaryFind(arr, target) {
  let mid = 0, left = 0, right = arr.length - 1;
  while(left <= right) {
    mid = (left+right) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
}

var n = binaryFind([1,2,4,6,7,9], 4);

console.log(n)
