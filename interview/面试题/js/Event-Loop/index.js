console.log('start');

setTimeout(() => {
  console.log('setTimeout');

  Promise.resolve().then(() => {
    console.log('Promise2');
  })
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0)
  
}, 0)

Promise.resolve().then(function() {
  queueMicrotask(() => {
    setTimeout(() => {
      console.log('queueMicrotask');
    }, 0)
  })
  console.log('promise');
})



console.log('end');