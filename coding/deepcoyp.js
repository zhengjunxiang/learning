function deepCopy(obj, map = new WeakMap) {
    // 如果输入的为基本类型，直接返回
    if (obj === null ||  typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    const copyObj = Array.isArray(obj) ? [] : {}

    if (map.get(obj)) return map.get(obj)
    map.set(obj, copyObj)

    for (let k in obj) {
        copyObj[k] = deepCopy(obj[k], map)
    }
    return copyObj;
}

let obj={
    a:1,
    b:{
        n:2,
    }
}

// let obj=[1,2,{AA: 12, bb: 'as'}]

console.log('newObj', deepCopy(obj))