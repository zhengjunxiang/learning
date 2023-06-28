// let s = '3D4h-3n-5-e', k = 4    // 用横线隔开一个组
// 结果: 3D4h-3n5e

const license = (s, k) => {
    s = s.toUpperCase()   // 转大写
    let sArr = s.split('-')  // 切割
    s = sArr.join('')

    let num = Math.floor(s.length / k) // 切割的次数
    let newArr = []
    for (let i = 0; i < num; i++) {
        s.splice(s.length - k)
    }

}