// const Koa= require('koa')
// const app=new Koa()
// const cors = require('@koa/cors');
// app.use(cors());  // 后端开启cors,允许跨域操作   现在任何一个前端向这个端口发数据，都能成功

// const main=(ctx,next)=>{
//     console.log(ctx.query.name);
//     ctx.body='hello world'
// }
// app.use(main)


// app.listen(3000,()=>{
//     console.log('cors项目已启动');
// })


// 在koa里面，要想使用cors来告诉浏览器允许别人向我发送数据就要用一个依赖


// 用原生的node来写一个cors
// 启动一个web请求
const http =require('http')

const server= http.createServer((req,res)=>{  //  http.createServer 就是启动创建一个后端服务
    //  所以在这里后端要告诉浏览器，你不能开启跨域，就是在响应头里面加

    res.writeHead(200,{  // 成功就返回 200 的状态码
        "Access-Control-Allow-Origin":"*",  // 允许所有的源向我发请求  就是配置一个白名单
        "Access-Control-Allow-Methods":"GET,POST,PUT,OPTIONS",// 请求的发生
        // 不管向浏览器返回什么类型都可以，浏览器都不会拦截你 
        "Access-Control-Allow-Headers":"Content-Type", // 加了这行就是允许的请求头设置类型
    })// 就是后端专门提供的一个写响应头的东西 

    // 在向前端响应数据前，我们就要开启cors
    res.end('hello cors')
})

server.listen(3000,()=>{
    console.log('cors项目已启动');
})
