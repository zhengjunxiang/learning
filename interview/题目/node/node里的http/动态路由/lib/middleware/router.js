const url = require('url')
const path = require('path')

function check(rule, pathname) {
  rule = rule.split(path.sep).join('/')
  const paraMatched = rule.match(/:[^/]+/g)   // ['/test/:course', ':course']
  const ruleExp = new RegExp(`^${rule.replace(/:[^/]+/g, '([^/]+)')}$`)

  // /test/123/abc  =>  ['/test/123/abc', '123', 'abc']
  const ruleMatched = pathname.match(ruleExp)

  // 将后端定义的规则和前端传过来的路径拼接成一个对象 ret = {course: 123, test: abc}
  if (ruleMatched) {
    const ret = {}
    if (paraMatched) {
      for (let i = 0; i < paraMatched.length; i++) {
        ret[paraMatched[i].slice(1)] = ruleMatched[i + 1]
      }
    }
    return ret
  }
  return null
}

// 'http://localhost:9090/}:"><'

function route(method, rule, aspect) {
  return async (ctx, next) => {
    const req = ctx.req
    if (!ctx.url) ctx.url = url.parse(`http://${req.headers.host}${req.url}`)
    const checked = check(rule, ctx.url.pathname) // '/home', '/home'

    if (!ctx.route && (method === '*' || req.method === method) && !!checked) {
      ctx.route = checked
      await aspect(ctx, next)
    } else {
      await next()
    }
  }
}

class Router {
  constructor(base = '') {
    this.baseURL = base
  }

  get(rule, aspect) {
    return route('GET', path.join(this.baseURL, rule), aspect)
  }

  post(rule, aspect) {
    return route('POST', path.join(this.baseURL, rule), aspect)
  }

  all(rule, aspect) {
    return route('*', path.join(this.baseURL, rule), aspect)
  }
}


module.exports = Router

// router.get('/home', (ctx, next) => {

// })