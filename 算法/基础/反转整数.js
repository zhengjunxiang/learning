let x = 123
let y = 2 ^ 53 - 1
// 数组的方式
const reverseInteger = n => {
    if (n < 0) {
        n = n.toString().split('-')[1]
        n = '-' + [...n].reverse().join('')
        n = +n
    } else {
        n = n.toString()
        n = [...n].reverse().join('')
    }

    if (n > Math.pow(2, 53) || n < -Math.pow(2, 53)) {
        return 0
    }

    return n
}

reverseInteger(-123)

// 
const reverseInteger1 = n => {
    if (n === 0) return 0
    let res = 0
    while (n !== 0) {
        res = res * 10 + n % 10
        n = parseInt(n / 10)
    }
    if (n > Math.pow(2, 53) || n < -Math.pow(2, 53)) {
        return 0
    }

    return res
}