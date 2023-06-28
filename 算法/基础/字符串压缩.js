// 存一取一

const cpmpress=(str)=>{
    let obj={},res=''
    for(let i=0;i<str.length;i++){
        const item =str[i]
        if(obj[item]===undefined){
            // 来新人了，有旧人
            if(Object.keys(obj).length>0){
                res+=str[i-1]+obj[str[i-1]]
                delete obj[str[i-1]]
            }
            obj[item]=1
        }else{
            obj[item]=obj[item]+1
        }
    }
   res+= Object.keys(obj)[0]+ Object.values(obj)[0]
   if(res.length<str.length) return res
   else return str

}