function timePromise(){
    return new Promise ((resolve,reject)=>{
        setTimeout(resolve,time)
    })
}

async function setColor(i,color){
    console.log(color);
    await timePromise(i)
}

async function run(){
    while(true){
        await setColor(1000,'黄')
        await setColor(2000,'绿')
        await setColor(3000,'红')
    }
}