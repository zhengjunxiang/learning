function myInstanceOf(example, classFunc){
    const proto = Object.getPrototypeOf(example)
    while(true){
        if(proto === null) return false
        if(proto === classFunc.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}