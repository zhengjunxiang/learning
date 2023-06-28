function instanceOf(L,R){
    while(L.__proto__){
        if(L.__proto__ === R.prototype){
            return true
        }else{
            L=L.__proto__
        }
    
    }
    return false
}

var arr=[]

instanceOf(arr,Array) // true
instanceOf(arr,Object) // true