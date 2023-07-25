class EventEmitter {
    constructor() {
      this.cache = {
        // 'hello': [() => {
        //   console.log('hello world');
        // }],
        // 'abc': []
      }
    }
  
    on(name, fn) { // 用于订阅
      if (this.cache[name]) { // 多次订阅
        this.cache[name].push(fn)
      } else {
        this.cache[name] = [fn]
      }
    }
  
    emit(type) { // 用于发布
      if (this.cache[type]) {
        this.cache[type].forEach(item => {
          if (this.cache[type]) {
            item()
          }
        });
      } else {
        this.cache[type] = []
      }
    }
  
    once(name, fn) {
      const foo = () => {
        fn()
        delete this.cache[name]
      }
      this.on(name, foo)
    }
  
    off (name, fn) { // 取消订阅
      const tasks = this.cache[name]
      if (tasks) {
        const index = tasks.findIndex(item => item === fn)
        if (index >= 0) {
          this.cache[name].splice(index, 1)
        }
      }
    }
  
  }
  
  let ev = new EventEmitter()
  // ev.on('hello', () => {
  //   console.log('hello world');
  // })
  // ev.on('hello', () => {
  //   console.log('hello world222');
  // })
  
  let fn = () => {
    console.log('hello on');
  }
  
  
  // ev.on('hello', fn)
  // ev.off('hello', fn)
  
  ev.once('hello', fn)
  ev.on('hello', fn)
  
  ev.emit('hello')