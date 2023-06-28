const Server =require('../node里的http/动态路由/lib/server')
const param =require('./aspect/param')
const Router = require("../node里的http/动态路由/lib/middleware/router")
const app = new Server()
const router =new Router()
app.use(param)

app.use(router.get('/coronavirus/index',async({route,res},next)=>{
    const {getCoronavirusKeyIndex}=require('./mock/mock.js')
    const index = getCoronavirusKeyIndex()

    res.setHeader('Content-Type','application/json')
    res.body={
        data:index
    }
    await next()
}))

app.use(router.get('/coronavirus/:date', async ({route, res}, next) => {
    const {getCoronavirusByDate} = require('./mock/mock.js');
    const data = getCoronavirusByDate(route.date);
    res.setHeader('Content-Type', 'application/json');
    res.body = {data};
    await next();
  }));

  app.use(router.all('/:*', async ({route, res}, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Not Found</h1>';
    res.statusCode = 404;
    await next();
  }));

app.listen({port:3000,host:'127.0.0.1'})