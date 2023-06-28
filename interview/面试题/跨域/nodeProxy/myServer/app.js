// 自己的后端

const http =require('http')

// 这个函数只有前端发了请求才会执行
const server= http.createServer((req,res)=>{  //  http.createServer 就是启动创建一个后端服务
    //  所以在这里后端要告诉浏览器，你不能开启跨域，就是在响应头里面加

    res.writeHead(200,{  // 成功就返回 200 的状态码
        "Access-Control-Allow-Origin":"*",  // 允许所有的源向我发请求  就是配置一个白名单
        "Access-Control-Allow-Methods":"GET,POST,PUT,OPTIONS",// 请求的发生
        "Access-Control-Allow-Headers":"Content-Type", // 加了这行就是允许的请求头设置类型
    })// 就是后端专门提供的一个写响应头的东西 

    // 自己的后端向别人的后端请求数据,
    const proxyReq =http.request({
        host:'127.0.0.1',
        port:'3000',
        path:'/',
        method:'GET',
    },proxyRes=>{
        // console.log(proxyRes);
        proxyRes.on('data',result=>{
            console.log(result.toString());  // 这就是我们向别人服务器上面拿的数据
            res.end(result.toString())   // 将拿到的数据返回给前端
        })
    }).end()
})

server.listen(3001,()=>{
    console.log('nodeProxy 我的项目已启动');
})
