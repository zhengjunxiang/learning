const http = require('http')
const path = require('path')
const url = require('url')
const fs =require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // 解析客户端所需要的资源地址
  let filePath = path.resolve(__dirname, path.join('www', req.url))
  console.log(filePath);

  if(fs.existsSync(filePath)){ 
    const stats = fs.statSync(filePath)   // fs.statSync判断当前资源是文件还是路径
    const isDir = stats.isDirectory()  // 是文件还是路径
    
    if(isDir){
        filePath=path.join(filePath,'index.html')
    }

    // const content = fs.readFileSync(filePath)  // 直接读取文件资源
    const fileStream =fs.createReadStream(filePath)  // 把文件读取成流类型
    const { ext } = path.parse(filePath)  // 拿到后缀
        
    // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.writeHead(200,{
        'Content-Type':mime.getType(ext),
        'Cache-Control':'max-age=86400'
    })
    
    // return res.end(content)
    fileStream.pipe(res)  // 充当了res.end   把文件流流入响应流对象中

  }else{
    res.writeHead(404,{'Content-TYpe':'text/html;charset=utf-8'})
    return res.end('<h1>Not Found</h1>')
  }


})
server.on('clientError',(err,socket)=>{
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log('服务已启动在', server.address());
})