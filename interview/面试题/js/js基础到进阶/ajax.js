// ajax.get()
// ajax.post()

const ajax = {
    get(url, fn) {  // 地址，回调函数
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          fn(xhr.responseText)
        }
      }
      xhr.send()
    },
    post(url, data, fn) {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          fn(xhr.responseText)  // 
        }
      }
      xhr.send(data)
    }
  }
  
  
  ajax.get('http:www.baidu.com', (res) => {
    console.log(res);
  })
  