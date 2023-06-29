const http = require('http');
const url = require('url');

const responseData={
    ID:'zhangsan',
    Name:'张三',
    
}

const server = http.createServer((req,res)=>{
    console.log(req);
    const { pathname} =url.parse(`http://${req.headers.host}${req.url}`)
    if(pathname === '/'){
        const accept = req.headers.accept;

        if(req.method === 'POST' || accept.indexOf('application/json') >= 0) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData));
          }
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Not Found</h1>');
    }
    console.log(pathname);
})

r
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

server.listen(8080,() => {
    console.log('服务已启动在', server.address());
  })