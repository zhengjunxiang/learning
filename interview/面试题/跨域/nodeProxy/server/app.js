// 别人的后端
const Koa= require('koa')
const app=new Koa()

const main=(ctx,next)=>{
    console.log(ctx.query.name);
    ctx.body='hello world'
}
app.use(main)

app.listen(3000,()=>{
    console.log('nodeProxy项目已启动');
})