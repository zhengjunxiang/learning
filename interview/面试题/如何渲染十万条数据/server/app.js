const http = require('http')

const server = http.createServer((req, res) => {
  // 开启cors
  res.writeHead(200, {
    // 允许跨域的域名
    'Access-Control-Allow-Origin': '*',
    // 允许跨域的请求方法
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    // 允许的头类型
    'Access-Control-Allow-Headers': 'Content-Type'
  })


  let list = []
  let num = 0

  for (let i = 0; i < 1000000; i++) {
    num++
    list.push({
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp.qqan.com%2Fup%2F2018-3%2F15210182804289411.jpg&refer=http%3A%2F%2Fp.qqan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668581413&t=ddd3532e56fa4a3dd5e3bf6f89d5957a',
      text: `我是${num}号选手`,
      tid: num
    })
  }

  res.end(JSON.stringify(list))
})

server.listen(3000, () => {
  console.log('服务已启动');
})