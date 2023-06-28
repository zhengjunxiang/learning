// async (ctx,next())=>{

// }

class Interceptor {
    constructor() {
        this.aspects = [] // 拦截到的某种情况
    }

    use(fn) {  // 注册拦截切面
        this.aspects.push(fn)
        return this
    }

    async run(context) {  // 执行拦截切面
        const aspects = this.aspects

        // 将拦截到的切面包装成一个洋葱模型
        const proc = this.aspects.reduceRight(function (a, b) {
            return async () => {
                await b(context, a)
            }
        }, () => Promise.resolve())

        try {
            await proc()
        } catch (error) {
            console.log(error);
        }
        return context
    }


}

module.exports=Interceptor