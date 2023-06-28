let arr = [10, 14, 19, 26, 27, 31, 35, 42, 44, 50], target = 31

// O(n)
// O(logN) + O(nlogN)
// 1. 选择数组中间值
// 2. 如果中间值就是目标值，算法结束
// 3. 如果中间值小余目标值， 在右半边的数组之后重新执行第一个步骤
// 4. 如果中间值大余目标值， 在左半边的数组之后重新执行第一个步骤

function binarySearch(array, target) {
  let left = 0, right = array.length - 1, mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (array[mid] < target) {
      left = mid + 1
    } else if (array[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  
  return -1
}

console.log(binarySearch(arr, target));