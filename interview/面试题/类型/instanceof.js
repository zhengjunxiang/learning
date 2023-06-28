function _instanceof(L,R){
    L=L.__proto__
    R=R.prototype

    while(L!==null){
        if(L==R){
            return true
        }else{
            L=L.__proto__
        }
    }
    return false
}

let arr=[1,2,3]

_instanceof(arr,Array)