let s1='applewater' ,s2='waterapple'

const isRotation =(s1,s2)=>{
    if(s1.length===s2.length){
        s1=[...s1]
        for(let i=0;i<s1.length;i++){
            s1.push(s1.shift())
            if(s1.join('')===s2){
                return true
            }
        }
    }else{
        return false
    }
    return false
}



let arr=[...s]
let tStr=''
for(let i=0;i<arr.length-1;i++){
    let t=arr.splice(0,1)
    arr.push(t)
    for(let j=0;j<arr.length;j++){
        tStr+=arr[j]
    }
    console.log(tStr)
    if(tStr===s){
        return true
    }
    tStr=''
}
return false