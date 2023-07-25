// 有序数组排好序
let arr = [
    [1, 3, 5, 7],
    [10, 11, 13, 26, 34],
    [43, 54, 65, 89]
]

// 在这个二位矩阵里面找到一个值
let target = 7

const searchTarget = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (target <= item[item.length - 1]) {
            for (let val of item) {
                if (target === val) {
                    return true
                }
            }
            return false
        }
    }
}
// 把范围缩小到某个数组内，再查找


// 衍生
let arr1 = [
    [1, 3, 5, 19],
    [10, 11, 13, 26, 34],
    [23, 54, 65, 89]
]


const searchTarget1 = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (target <= item[item.length - 1]) {
            for (let val of item) {
                if (target === val) {
                    return true
                }
            }
        }
    }
    return false
}

// 无序数组
 