class LRUCache {
    constructor(size) {
      this.size = size
      this.cache = new Map()
    }
  
    get(key) {
      const hasKey = this.cache.has(key)
      if (hasKey) {
        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, val)
        return val
      } else {
        return -1
      }
    }
  
    put(key, val) {
      const hasKey = this.cache.has(key)
      if (hasKey) {
        this.cache.delete(key)
      }
      if (this.cache.size >= this.size) { // 容量上限了
        this.cache.delete(this.cache.keys().next().value)   // 最早被存放的key
      }
      
      this.cache.set(key, val)
    }
  
  }
  
  
  // {
   
  //   2: 2,
  //   3: 3,
  //   [1]: 123,
  //   1: 1,
  // }