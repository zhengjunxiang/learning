// 123 => 321
// 900 => 9

const reverseInteger = function (number) {
    return Number([...number.toString()].reverse().join(''))

}
const reverseInteger1 = function (number) {

    let str = number.toString() // '123'
    let res = ''
    while (str.length > 0) {
        res += str[str.length - 1]
        str=str.slice(0,-1)
    }
    return +res
}
console.log(reverseInteger(100));