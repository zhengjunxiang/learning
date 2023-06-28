const Koa= require('koa')
const app=new Koa()

const main=(ctx,next)=>{
    console.log(ctx.query.name);
    ctx.body='hello world'
}
app.use(main)

app.listen(3000,()=>{
    console.log('3000端口已启动');
})