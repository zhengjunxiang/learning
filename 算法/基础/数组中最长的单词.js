let arr=[
    'dog',
    'interface',
    'international',
    'aaaaaaaaaaaaa',
    'world'
]

const longer=(arr)=>{
    let map={
        index:[],
        max:0
    }

    arr.forEach((value,index)=>{
        if(value.length>=map.max){
            if(value.length===map.max){
                return map.index.push(value)
            }else{
                map.index=[],
                map.index.push(value),
                map.max=value.length
            }
           
        }
    })

    return map.index
}

console.log(longer(arr));