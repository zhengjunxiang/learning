const Server = require('./lib/server')
const Router = require("./lib/middleware/router")

const app = new Server()
const router = new Router()


app.use(async ({res},next)=>{
    res.setHeader('Content-Type','text/html')
    res.body='<h1>hello</h1>'
    await next()
})

app.use(router.all('/test/:course/:lecture',async({route,res},next)=>{
    res.setHeader('Content-Type','application/json')
    res.body=route
    await next()
}))

app.listen({port:9090,host:'127.0.0.1'})