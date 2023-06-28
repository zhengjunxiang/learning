// 220 284
// 除自己以外的因子 剩下的因子加起来等于对方


const fun=(num)=>{
    let arr=[]
    let res=0
    for(let i=1;i<num;i++){
        if(num%i===0){
            arr.push(i)
        }
    }
    for(let i=0;i<arr.length;i++){
        res+=arr[i]
    }
    return res  // 284
}

// console.log(fun(220));


const fun2=(n)=>{
    let arr=[]
    for(let i=1;i<=n;i++){
       let a=fun(i) // i=220 a==284
       if(fun(a)===i){
        arr.push([i,a])
       }
    }
    return arr
}
console.log(fun2(300));


// 对象 对应的key value互相一样
const fun3=(k)=>{
    let obj={}
    for(let i=1;i<=k;i++){
        obj[i]=fun(i)
    }

    let res=[]
    for(let key in obj){
        if(obj[key]>key){
            if(key === `${obj[obj[key]]}`){
                res.push([Number(key),obj[key]])
            }
        }
    }
    return res
}

console.log(fun3(300));