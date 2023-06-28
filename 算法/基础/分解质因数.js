let x = 10 //2 5

const prime = (num) => {
    let res = []
    for(let i=2;i<=num;i++){
        while(num%i ===0){
            num=num/i
            res.push(i)
        }
    }
}