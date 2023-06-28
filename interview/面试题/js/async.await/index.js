const timeOut = (time) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 200)
    }, time)
  })
  
  
  // async function getData() {
  //   const result1 = await timeOut(200)
  //   console.log(result1);
  
  //   const result2 = await timeOut(result1)
  //   console.log(result2);
  
  //   const result3 = await timeOut(result2)
  //   console.log(result3);
  // }
  // getData()
  
  
  
  function* getData() {
    const result1 = yield timeOut(200)
    console.log(result1);
  
    const result2 = yield timeOut(result1)
    console.log(result2);
  
    const result3 = yield timeOut(result2)
    console.log(result3);
  }
  
  // async
  function step(generator) {
    const gen = generator()
    let lastVal;
  
    return () => {
      return Promise.resolve(gen.next(lastVal).value).then(value => {
        lastVal = value
        return lastVal
      })
    }
  }
  
  const run = step(getData)
  
  // await
  function recursive(promise) {
    promise().then(result => {
      if (result) {
        recursive(promise)
      }
    })
  }
  recursive(run)