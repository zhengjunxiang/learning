const Koa = require('koa')
const router = require('koa-router')()
const TOKEN ='123321'
const {koaBody} = require('koa-body')

const app = new Koa()

// 跨域
const cors = require('@koa/cors');

app.use(cors());

app.use(async (ctx,next)=>{
    if(ctx.path='/api/login'){
        await next()
        return
    }
    //  当前端请求的不是登录接口时，我要验证你是否携带东西
    const cookies=ctx.cookies.get('token')
    console.log(cookies);
    if(cookies && cookies===TOKEN){
        await next()
        return
    }
    ctx.body={
        code:401,
        msg:'权限不足'
    }
})

app.use(koaBody({multipart:true}))

router.post('/api/login', async(ctx,next) => {
    ctx.cookies.set('token',TOKEN,{
        expires: new Date(+new Date() + 1000*24*60*60*7),
        httpOnly:false,
        signed:false
    })
  ctx.body = {
    msg: '成功',
    code: 0
  }
})

router.get('/api/name', async(ctx) => {
    ctx.body = {
      date:'bruce'
    }
  })

app.use(router.routes())

app.listen(3000, () => {
  console.log('server 3000...');
})