class Pro {
    static PENDING = 'pending'; static FULFILLED = 'fulfiled'; static REJECTED = 'rejected'  // 定义promise的三种状态
    constructor(fn) {
        this.status = Pro.PENDING  // 初始化promise对象的状态
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        this.result = null   // resolve与reject函数的参数
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))  // 这里绑定this 因为在new出新实例之后再到外部环境执行这两个方法 this 丢失
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        setTimeout(() => {
            if (this.status === Pro.PENDING) {
                this.status = Pro.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    };
    reject(result) {
        setTimeout(() => {
            if (this.status === Pro.PENDING) {
                this.status = Pro.REJECTED
                this.result = result
                this.rejectCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    };
    then(onFulfilled, onRejected) {
        return new Pro((resolve, reject) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { }
            onRejected = typeof onRejected === 'function' ? onFulfilled : () => { }
            if (this.status === Pro.PENDING) {
                this.resolveCallbacks.push(onFulfilled)
                this.rejectCallbacks.push(onRejected)
            }
            if (this.status === Pro.FULFILLED) {
                setTimeout(() => {
                    onFulfilled(this.result)
                })
            }
            if (this.status === Pro.REJECTED) {
                setTimeout(() => {
                    onRejected(this.result)
                })
            }
        })
    }
}



console.log(1);

let p = new Pro((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        resolve('yes')
        console.log(4);
    })
})

p.then(res => {
    console.log(res);
})
.then(()=>{
    console.log(1234321412);
})
console.log(3);