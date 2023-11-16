
// 不管是否对错，都返回
// resolve
const promises = [
    Promise.reject('ERROR A'),
    Promise.reject('ERROR B'),
    Promise.reject('result'),
  ]
  Promise.allSettled(promises).then((value) => {
    console.log('value: ', value)
  }).catch((err) => {
    console.log('err: ', err)
  })
