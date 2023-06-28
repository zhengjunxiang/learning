let A='ABCD' , B='ACD'

const compareString=(A,B)=>{
    [A,B]=[[...A],[...B]]
    for(let item of B){
        let index =A.indexOf(item)
        if(index!==-1){
            A.splice(index,1)
        }else{
            return false
        }
    }

    return true
}
// 哈希表
const compareString1=(A,B)=>{
    let map=new Map()
    for(let i=0;i<A.length;i++){
        if(map.has(A[i])){
            map.set(A[i],map.get(A[i])+1)
        }else{
            map.set(A[i],1)
        }
    }

    for(let j=0;j<B.length;j++){
        if(map.get(B[j]) >0){
            map.set(B[j],map.get(B[j])-1)
        }else{
            return false
        }
    }
    return true
} 