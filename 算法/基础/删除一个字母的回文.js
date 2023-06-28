// oppo  对称
let s = 'aba'
// 双指针
const vaildpalindrome = s => {
    let left = 0
    let right = s.length - 1

    while (left < right) {
        if (s[left] !== s[right]) {
            // 删除一个再继续
            return (isSubPailndrom(s, left + 1, right) || isSubPailndrom(s, left, right - 1))
        } else {
            left++
            right--
        }
    }
    return true
}

const isSubPailndrom = (s, left, right) => {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false
        }
        left++
        right--
    }
    return true
}

const isSubPailndrom2 = (s) => {
    let removed = false
    for (let [i, j] = [0, s.length - 1]; i < j; i++, j--) {
        if (s[i] !== s[j]) {
            if (removed) {
                return false
            }
            if (s[i] === s[j - 1]) {
                j--
                removed = true
            } else if (s[i + 1] === s[j]) {
                i++
                removed = true
            }
        } else {
            return true
        }
    }
}