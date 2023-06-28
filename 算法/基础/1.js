let arr1=[1,2,3,4]
let arr2=[2,3,4]


for(let i=0;i<arr1.length;i++){
    if(arr2.indexOf(arr1[i])!==-1){
        arr1=arr1.splice(i,1)
        arr2=arr2.splice(arr2.indexOf(arr1[i]),1)
    }
}
console.log(arr1,arr2)

