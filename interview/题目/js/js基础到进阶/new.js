function Person(name) {
    this.name = name
    return {}
  }
  
  
function myNew(fn, ...args) {
const obj = {}

let result = fn.apply(obj, args)
obj.__proto__ = fn.prototype

return typeof result == 'object' && result != null ?  result : obj
}
  
  let p = myNew(Person, 'bruce')
  // p
  
  
  
  
  
  // function Test(name) {
  //   this.name = name
  //   return {}
  // }
  
  // let t = new Test('tom')
  
  // console.log(t);