//递归

//5!
// function mul(n){
//     // if(n==1){           //找出口
//     //     return 1
//     // }
//     return n*mul(n-1);   //找规律
// }

// console.log(mul(5));
//斐波那契数列


function fb(n){
    let s=1
    if(n==1 || n==2){
        return s
    }else{
        s=fb(n-1)+fb(n-2)
    }
    return s
}

console.log(fb(15));