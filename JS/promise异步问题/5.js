const p1 = new Promise((resolve, reject) => { // p1 是 then1 执行返回的新 Promise
    console.log(1) // 同步
    resolve()
  }).then(() => { // 异步：微任务 then1
    console.log(2)
    const p2 = new Promise((resolve, reject) => { // p2 是 then2 执行返回的新 Promise
      console.log(3) // then1 里的 同步
      resolve()
    }).then(() => { // 异步：微任务 then2
      console.log(4)
      
      // 拿着 p2 重新 then
      p2.then(() => { // 异步：微任务 then3
        console.log(5)
      })
    })
    
    // 拿着 p1 重新 then
    p1.then(() => { // 异步：微任务 then4
      console.log(6)
    })
  })

// 1 2 3 6 4 6 5 
  