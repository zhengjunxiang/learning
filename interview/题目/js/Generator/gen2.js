var fetch = require('node-fetch')

function* getData() {
  var url = 'https://www.fastmock.site/mock/39ac87de3060aa2bb2ba20a0ff375c81/cat-movie/mostLike'
  var result = yield fetch(url)
  console.log(result);
}
var g = getData()
var res = g.next()

res.value.then((data) => {
  return data.json()
}).then((data) => {
  g.next(data)
})