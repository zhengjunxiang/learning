let a='abcd' , b ='acbd'  // true
let c='cat' ,d='asd'    //false

const anagram=(s,t)=>{   // 转数组切割
    if(s.length!==t.length){
        return false
    }else{
        [s,t]=[[...s],[...t]]
        for(let item of s){
            let index =t.indexOf(item)
            if(index!==-1){
                t.splice(index,1)
            }else{
                return false
            }
        }
        return true
    }
}

// console.log(anagram(c,d));



const single=(a,b)=>{
    if(a.length!==b.length){
        return false
    }else{
        let obj={}

        for(let key of s){
            if(obj[key] === undefined){
                obj[key]=1
            }else{
                obj[key] =obj[key]+1
            }
        }
    
        for(let key of t){
            if(obj[key]=== undefined){
                return false
            }else{
                obj[key]=obj[key]-1
                if(obj[key]===0){
                    delete obj[key]
                }
            }
    
        }
        return true
    }

}

