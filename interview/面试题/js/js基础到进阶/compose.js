function fn1(x){
    return x+1
}
function fn2(x){
    return x+2
}
function fn3(x){
    return x+3
}
function fn4(x){
    return x+4
}

const a=compose(fn1,fn2,fn3,fn4)
console.log(a(1));  //11


function compose(...fn){
    return (res)=>{
        fn.forEach((item,index)=>{
            res=item(res)
        })
        return res
    }
    
}




// compose 就是将第一个函数的执行结果传给下一个函数，将下一个函数的执行结果传给下下一个
