
// 返回最快而且是正确的
const promises = [
    Promise.reject('ERROR A'),
    Promise.reject('ERROR B'),
    Promise.reject('result'),
  ]
  Promise.any(promises).then((value) => {
    console.log('value: ', value)
  }).catch((err) => {
    console.log('err: ', err)
  })