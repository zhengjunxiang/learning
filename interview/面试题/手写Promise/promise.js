class myPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECT = 'reject'

    constructor(fn) {
        this.status = myPromise.PENDING;
        this.result = null;
        this.resolveCallbacks = []  // 保存resolve函数
        this.rejectCallbacks = []  // 保存reject函数
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        setTimeout(() => {
            if (this.status === myPromise.PENDING) {
                this.status = myPromise.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }
    reject(result) {
        setTimeout(() => {
            if (this.status === myPromise.PENDING) {
                this.status = myPromise.REJECT
                this.result = result
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }
    then(onFuifilled, onReject) {
        return new myPromise((resolve, reject) => {
            onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : () => { }  // 判断传入的是否为函数
            onReject = typeof onReject === 'function' ? onReject : () => { }
            if (this.status === myPromise.PENDING) {
                this.resolveCallbacks.push(onFuifilled)
                this.rejectCallbacks.push(onReject)
            }
            if (this.status === myPromise.FULFILLED) {
                setTimeout(() => {
                    onFuifilled(this.result)
                })
            }
            if (this.status === myPromise.REJECT) {
                onReject(this.result)
            }
        })
    }

}

let pro = new myPromise((resolve, reject) => {
    resolve('1111')
})
pro.then((result) => {
    console.log(result);
})
