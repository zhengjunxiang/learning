// setimeout 实现 setInterval
// function mySetTimeout(fn,delay){
//     const intervalFunc=()=>{
//         fn(),
//         mySetTimeout(fn,delay)
//     }

//     setTimeout(intervalFunc,delay)
// }

// mySetTimeout(()=>{
//     console.log('bruce');
// },1000)

// setInterval 实现 setimeout
function mySetInterval(fn,delay){
    let time=setInterval(()=>{
        fn()
        clearInterval(time)
    },delay)

    
}

mySetInterval(()=>{
    console.log('bruce');
},1000)