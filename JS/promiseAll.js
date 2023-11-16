
// 所有正确才返回
const promises = [
    Promise.resolve('ERROR A'),
    Promise.resolve('ERROR B'),
    Promise.reject('result'),
  ]
  Promise.all(promises).then((value) => {
    console.log('value: ', value)
  }).catch((err) => {
    console.log('err: ', err)
  })