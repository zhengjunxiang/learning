// 深拷贝
function copy(obj){
    let copyVal={}
    if(Array.isArray(obj)){
        copyVal=[]
        // 接下来的操作跟拷贝对象一样
    }
    if(obj instanceof Date){
        return copyVal=new Date(obj)
    }
    if(obj instanceof RegExp){
        return copyVal=new RegExp(obj)
    }
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key]!== 'object' && obj[key]!==null){
                copyVal[key]=obj[key]
            }else{
                copyVal[key]=copy(obj[key])
            }
        }
    }
    return copyVal
}

function deepCopy(obj, map = new WeakMap()) {
    // 如果输入的为基本类型，直接返回
    if ( obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    const copyObj = Array.isArray(obj) ? [] : {}

    if (map.get(obj)) return map.get(obj)
    map.set(obj, copyObj)

    for (let key in obj) {
        copyObj[key] = deepCopy(obj[key], map)
    }
    return copyObj
}

let obj={
    a:1,
    b:{
        n:2,
    }
}

// let obj=[1,2,{AA: 12, bb: 'as'}]


let  newObj=deepCopy(obj)

console.log('newObj', newObj)