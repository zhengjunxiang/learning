const net = require('net')

function responseData(str,status = 200, desc = 'OK'){
    return `HTTP/1.1 ${status} ${desc}
    Conection: keep-alive 
    Date:${new Date()} 
    Content-Length:${str.length}
    Content-Type: text/html

    ${str}
    `
}

const server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        const matched = data.toString('utf-8').match(/^GET ([/\w]+) HTTP/)
        if(matched){
            const path = matched[1]
            if(path==='/'){
                socket.write(responseData('<h1>hello world</h1>'))
            }else{
                socket.write(responseData('<h1>Not Found</h1>',404,'Not Found'))
            }
        }
        // if(/^GET \/ HTTP/.test(data)){
        //     socket.write(responseData('<h1>hello world</h1>'))
        // }
        console.log(`DATA:\n\n ${data}`);
    })
    socket.on('close',(data)=>{
        console.log('连接关闭');
    })
}).on('error',()=>{
    throw err
})
server.listen({host:'0.0.0.0',port:9999},()=>{
    console.log('服务已启动在',server.address());
})