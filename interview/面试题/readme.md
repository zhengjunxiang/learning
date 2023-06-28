## Vue 

1. 响应式原理：
  2.1 vue2: defineProperty()
      vue中有一个 observer 观察者类，将一个 data 传入观察者里面，如果传入的是一个数组，那么vue 就会重写数组的原生方法，然后再将数组的每个方法进行 observe
      让其变成响应式数据；否则就会执行一个 walk 函数，遍历 data 中的数据，使用 defineReactive 方法将数据设置成响应式数据，而 defineReactive 方法里面是由
      defineProperty 方法实现的

   缺点：
      1. 不能对数组进行监听，所以碰到数组要重写其原生方法
      2. 对于复杂的对象要进行深度的见监听，就要多次递归该对象，计算量大
      3. 无法监听到对象增加属性以及对象删除属性，所以要增加 $set $delete api

  2.2 vue 的深度监听：
      vue2 在定义响应式数据的时候是递归的去监听该对象，而 vue3 则是在每次执行 defineReactive 函数的时候只执行一次 observer 函数

  2.3 vue3 对数组的监听
      首先重新定义了一个数组的原型，然后再创建一个新的对象将该对象的原型指向到数组的原型上面
      然后遍历数组的方法，重新定义数组的方法并且将这些方法放到这个对象上面

  2.4 依赖收集
      依赖收集简单理解就是收集只在实际页面中用到的data数据，这样是为了提高代码的执行效率.
      收集依赖从 Observer Dep Watcher 三个对象进行讲解，分为 object array 两种依赖收集方式
      数组的依赖跟对象的属性依赖收集是不一样的
  
      收集依赖的三个核心对象: 
      Observer[数据的观察者]：将数组/对象转成可观测数据，每个Observer的实例成员中都有一个Dep的实例
      Dep[观察目标类]：每一个数据都会有一个Dep类实例，它内部有个subs队列，subs就是subscribers的意思，保存着依赖本数据的观察者，当本数据变更时，调用 
                    dep.notify()通知观察者
      Watcher[观察者类]：进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例


  ## JavaScript
   1. 箭头函数：1. 箭头函数的this指向的是父级作用域的this，是通过查找作用域链来确定 this 的值也就是说，看的是上下文的this，指向的是定义它的对象，而不是使用 
                  时所在的对象；普通函数指向的是它的直接调用者。
               2. 不可以被当作构造函数：不能被当作构造函数来使用，通过new命令来作为构造函数会报错，这里没有构建原型的说法，不存在prototype这个属性，也不 
                  能通过super访问原型的属性，而且new target也是不能用的
               3. 不可以使用arguments对象，该对象在函数体内不存在，如果要用就用rest参数替代。
               4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

   2. Set 与 Object 的区别:
     1. Object 的键值只能是 Symbol 与 字符串类型，而 Map 的键值可以是各种各样的类型，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一 
        种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
     2. Map的键值对数量可以通过size属性获取，Object则需要通过Object.keys(obj).length类似的方式获取
     3. Map的键值是有序的，数据的排序是根据用户push的顺序进行排序的, 而Object实例中key,value的顺序就是有些规律了， (他们会先排数字开头的key值，然后才是字 
        符串开头的key值)；

   3. 防抖：
      function debounce(fn,wait){
            const self=this
            const args=arguments
            var timeout

            return function(){
               clearTimeout(timeout)
               timeout=setTimeout(function(){
               fn.apply(self,args)

               },wait)
            }
         }
   4. 节流:节流就是限定在某一个时间点段内无论点击多少次，但是最后结果只会触发一次

       function throttle(fn,wait){  
               var pre=0

            return function(){
               const self=this
               const args=arguments

               var now=+new Date()
               if(now-pre>wait){

               fn.apply(self,args)
               pre=now
               }
            }
         }   

  ## 浏览器
  1. 缓存：
     1. cookie:因为客户端与服务端通信使用 http 协议，但它是一个无状态的协议，所以这就导致了服务端不知道谁在浏览网页，所以服务端会将一些
        键值对返回给浏览器，用来判断用户信息，这就是 cokie ,它一般不超过 4kb ，常用 Expires 设置过期时间，使用 Max-Age 设置过期的秒数
     2. localStorage: 它是一个持久化的本地缓存，一般大小为 5M ，只有用户主动清除数据的时候数据才会消失，否则数据就会永远不过期，它只能存储
        字符串。会受同源策略的影响。
        localStrage.setItem()
        localStrage.getItem()
        localStrage.key()
        localStrage.removeItem()
        localStrage.clear()
     缺点：  1. 不能设置过期时间
             2. 只能存储字符串
      3. sessionStorage: 它与 localStorage 用法基本一致，但是它的生命周期不一样，当页面关闭，sessionStorage 就会删除数据
    
    关于cookie、sessionStorage、localStorage三者的区别主要如下：
     1. 存储大小：cookie数据大小不能超过4k，sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大
     2. 有效时间：localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； sessionStorage数据在当前浏览器窗口关闭后自动删除；cookie设置的cookie 
        过期时间之前一直有效，即使窗口或浏览器关闭
     3. 数据与服务器之间的交互方式，cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端； sessionStorage和localStorage不会自动把数据发给服务 
        器，仅在本地保存

  ## HTML && CSS


  路由守卫