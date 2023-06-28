const Koa= require('koa')
const app=new Koa()

const main=(ctx,next)=>{
    console.log(ctx.query);
    const{name,age,cb}=ctx.query;
    const userInfo=`${name}今年${age}岁`
    const str =`${cb}(${JSON.stringify(userInfo)})`  // 后端将前端传过来的值拼接成一个字符串 函数调用的样子'callback()'

    // ctx.body='hello world'
    ctx.body=str  //将字符串输出给前端
}
app.use(main)

app.listen(3000,()=>{
    console.log('3000端口已启动');
}) 