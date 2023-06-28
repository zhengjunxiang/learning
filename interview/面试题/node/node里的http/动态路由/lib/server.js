const http =require('http')
const Intercepter = require('../interceptor')


module.exports = class {
    constructor () {
      const interceptor = new Intercepter()
  
      this.server = http.createServer(async (req, res) => {
        await interceptor.run({req, res})
        if (!res.writableFinished) {
          let body = res.body || '200 OK'
          if (body.pipe) { // body 一定是流类型
            body.pipe(res)
          } else {
            if (typeof body !== 'string' && res.getHeader('Content-Type') === 'application/json') {
              body = JSON.stringify(body)
            }
            res.end(body)
          }
        }
      })
  
      this.interceptor = interceptor
    }
  
    listen(opts,cb=()=>{}) {
      if(typeof opts === 'number') opts={port:opts}
      opts.host = opts.host || '0.0.0.0'
      console.log(`服务已启动在http://${opts.host}:${opts.port}`);
      this.server.listen(opts,()=>cb(this.server))
    }

    use(aspect){
        return this.interceptor.use(aspect)
    }


  }
