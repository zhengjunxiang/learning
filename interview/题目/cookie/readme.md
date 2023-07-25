1. 概念
   控制客户端，

2. 产生的原因
   因为http是无状态的，用cookie来存储 客户端与服务端的会话问题

3. cookie首部字段
   set-cookie:在响应报文的首部来设置传递给客户端（cookie）信息
   <!-- set-cookie:name=xxx; Httponly -->
   Cookie:客户端传给服务端信息

   cookie是一种机制

4. 交互流程
   - 客户端请求服务端
   - 服务端生成 cookie 信息 使用Set-Cookie 添加到响应报文头
   - 客户端拿到之后保存 cookie
   - 客户端在下一次请求通过把信息写入请求报头传递给服务端
5. 声明周期

