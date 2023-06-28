153 = 1 * 1 * 1 + 5 * 5 * 5 + 3 * 3 * 3

1634 = 1 * 1 * 1 * 1 + 6 * 6 * 6 * 6 + 3 * 3 * 3 * 3 + 4 * 4 * 4 * 4

const isTrue = num => {
    const n = num.toString().length
    const str = num.toString()  //  将数字转化成字符串，同过下标访问各个数字
    let total = 0

    for (let i = 0; i < n; i++) {
        total += Math.pow(str[i], n)

    }
    if (total === num) {
        return true
    } else {
        return false
    }
}

isTrue(370)

const getNumber = n => {    // 找出 n 位数中的所有水仙花数
    let min = Math.pow(10, n - 1)
    let max = Math.pow(10, n)
    let arr = []
    if (n === 1) {
        min = 0
    }
    for (let j = min; j < max; j++) {
        if (isTrue(j)) {
            arr.push(j)
        }
    }
}

console.log(getNumber(4));