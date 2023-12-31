# js的基础类型

# js中最大，最小安全值
  最大值：2^53  最大安全值2^53 -1

# 最小安全值
 -2^53

# 深拷贝和浅拷贝
 浅拷贝只拷贝一层，相当于只复制了对象的引用地址；深拷贝是层层拷贝，需要在对中维护一个新的对象，具有一个新的引用地址
  1. 实现浅拷贝：1.Object.assign({},a)  2. 解构   
  2. 实现深拷贝：
     1. JSON.parse(JSON.stringify(object))，这个方法不接受函数、undefined、symbol这三种数据类型的拷贝；同时如果对象中存在循环引用就会报错
  JSON.stringify()：将js对象转成字符串
  JSON.parse():解析JSON字符串
     2. h5 的新规范当中，JavaScript 附带了一个用于深拷贝的内置函数——structuredClone()。
    structuredClone(value, { transfer })
    - 参数
    value
    要克隆的对象：这可以是任何 结构化可克隆类型。
    - transfer 可选
    可转移的对象： 为一个数组，其中的值将被移动到新的对象，而不是克隆至新的对象。
    - 返回值
    返回的值是原始 的深层副本value。


  实现深浅拷贝，首先判断被拷贝的对象是否为基本类型，如果是基本类型的话则直接返回出来；不是基本类型的话那么就说明此时被拷贝的为一个对象。
  到这里，我们再来判断这个值为数组还是对象，如果这个值是数组，我们就声明出一个数组出来，如果这个值是一个对象，我们就声明出一个对象。
  再用 let in 来遍历这个值的属性，再用 hasOwnProperty 来检测这个对象是否具有遍历到的这个属性再将这个属性添加到新的对象上面。此时实现
  浅拷贝，深拷贝在这个基础上添加一个遍历。

# 闭包
   闭包正确的定义是：假如一个函数能访问外部的变量，那么就形成了一个闭包，而不是一定要返回一个函数
   在js执行引擎中，一个函数被执行完毕后该函数的执行上下文就会被垃圾回收机制回收；但是，当一个函数内部的函数被返回出来执行，
   如果内部函数对外部函数中的变量存在引用时，引用的这些变量集合称为闭包；这个集合不会随外部函数的执行上下文的回收而消失。
   

# 变量提升
   var:使用 var 关键字声明的变量会自动提升到函数作用域顶部，var 声明的是函数作用域。
   let:let关键字可以将变量绑定到所在的任意作用域。换句话说 let 为其声明的变量隐式的劫持了所在的块级作用域。let 进行的声明不会在块作用域中进行提升。
       在let声明之前的执行瞬间被称为"暂时性死区"，在此阶段应用任何后面的变量都会抛出 ReferenceError
   块作用域是函数作用域的子集，因此适用于var 的作用域限制同样也适用于let.
   const:const 行为与 let 基本相同，但是它声明变量的时候必须同时初始化变量。
# 预编译
  发生在代码执行之前

# 发生在全局作用域 三部曲
1. 创建全局(GO)对象
2. 找全局变量声明，将变量声明作为GO的属性名，值为undefined
3. 在全局找函数声明，将函数名作为GO对象的属性名，值赋予为函数体
  
# 发生在函数执行之前 四部曲 函数作用域
1. 创建函数的作用域（AO:Activation Object）对象
2. 找形参和变量声明,将变量声明和形参作为AO的属性名，值为undefined
3. 将实参和形参统一
4. 在函数体内找函数声明，将函数名作为AO对象的属性名，值赋予为函数体


var fun;
fun(){}
console.log();
fun=awei;
console.log()

# isNaN() 和 Number.isNaN()
 isNaN：当我们向isNaN传递一个参数，它的本意是通过Number()方法尝试将这参数转换成Number类型，如果成功返回false，如果失败返回true。
        所以isNaN只是判断传入的参数是否能转换成数字，并不是严格的判断是否等于NaN
 Number.isNaN() 只能判断出传入的值是否为NaN；判断传入的参数是否严格的等于NaN(也就是 ===)。

# 遍历对象时，把原型上的属性遍历出来怎么办？
 for-of 只能遍历有迭代器属性的东西
 for-in 会遍历到原型上面的属性

 使用Object.hasOwnProperty()判断对象上是否显示具有某项属性，如果有就不遍历出来
  person.haOwnPorperty(key)  && console.log(key)   // es6的写法，这句话相当于 if

# js的装箱与拆箱    发生在v8引擎内部
  装箱:把一个基本的类型变成一个对应的引用类型的操作
  const str='b_ruce'   // new String('b_ruce')
  const index=str.indexOf('_')
  console.log(index) //1

  装箱/包装类的过程 ：把 基本数据类型 转化成对应的 引用类型 的操作
1. 创建一个String类型的实例
2. 在实例上调用指定的方法
3. 销毁这个实例

  拆箱的过程 ：把 引用类型 转化成对应的 基本数据类型 的操作
  当对象需要发生隐式转换的时候发生原始类型的转换的时候就会发生拆箱;就比如 if([1,2]) {} 会将这个数组转化成true/，此时就会发生拆箱

  对象身上本身就具有 toPrimitive() ,当对象需要发生隐式转换的时候，也就是这个方法需要被执行的时候
  1. 判断值为原始类型，直接返回
  2. 调用 valueOf(),如果得到了原始类型，直接返回
  3. 调用 toString(),如果得到了原始类型，直接返回
  4. 报错

# 为什么typeof null ==="Object"
 在二进制中只要前三位为 000 ，就会被判断成 object；
    对于 null 来说，很多⼈会认为他是个对象类型，其实这是错误  
    的。虽然 typeof null 会输出 object，但是这只是 JS 存在的⼀
    个悠久 Bug。在 JS 的最初版本中使⽤的是 32 位系统，为了性能考
    虑使⽤低位存储变量的类型信息，000 开头代表是对象，然⽽ null
    表示为全零，所以将它错误的判断为 object 。虽然现在的内部类
    型判断代码已经改变了，但是对于这个 Bug 却是⼀直流传下来。

# js隐式转换规则
1. 转成string类型：'+' (字符串连接)
2. 转成number类型：'++' '--' (自增，自减) + - * / % （算数运算符） . < >= <= == != (关系运算符)
3. 转成boolean类型：！(逻辑非运算符)


- 等号==
1. 如果有一边是布尔值，则就会转换成数字进行比较
2. 如果有一边是字符串，另外一边是数字，则就会将字符串转换成数字 进行比较
3. 如果有一边是对象，另一边不是，那就先将对象按照拆箱步骤进行转换，得到原始类型再按照上述规则对比
4. null == undefined // true

对象本身就有 toPrimitive(), 当对象需要发生隐式转换的时候，也就是这个方法需要被执行的时候就会执行以下操作，这个过程也就是拆箱的过程
 ## 转number
调用 ToPrimitive (obj,Number)
1. 如果obj是基本类型,直接返回
2. 否则,调用ValueOf方法,如果得到一个原始类型.则返回
3. 否则,调用toString方法,如果得到一个原始类型.则返回
4. 否则报错

 ## 转string
ToPrimitive (obj,String)
1. 如果obj是基本类型,直接返回
2. 否则,调用toString方法,如果得到一个原始类型.则返回
3. 否则,调用ValueOf方法,如果得到一个原始类型.则返回
4. 否则报错


# undefined >= undefined fasle 
这是关系运算符，会进行隐式转换成 NaN >= NaN

[] == ![]  逻辑非的优先级高于等号

1. []==false
2. []==0
3. [].value==0
4. [].toString==0
5. 0==0
6. true

# 为什么 0.1+0.2！=0.3

因为在JS中数字采用的IEEE 754的双精度标准进行存储，简单的理解成就是存储一个数值所使用的二进制位数比较多而已，这样得到的数会更加精确。
 Js中的小数是浮点数，而浮点数需要转成二进制来运算的，通过二进制进行加减运算，但是有些小数（0.1）就是不能被二进制用来表示，0.1用二进制
 表示的话就是一个无线循环的数，而js有极限值，就会截取部分出来，从而造成了精度丢失。

解决方法：
1. 先转换成整数，再变回小数
2. parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true

 
# js 绑定点击事件有几种方法   6.html
 1. 获取dom结构，addEventListener 的第三个参数是用来控制js事件流 true 则开启捕获事件，默认为fasle 开启冒泡事件
    阻止事件传播：stopPropagation()    // 阻止后面的捕获或者冒泡事件
    阻止默认事件：stopImmediatePropagation()
 2. 

# js事件流模型  
  有三个阶段：
  事件捕获阶段（目标在捕获阶段不接收事件）
  目标阶段 （事件的执行阶段，此阶段会被归入冒泡阶段）
  事件冒泡阶段 （事件传回Dom根节点）

  在事件流中又有着两个模型：1.事件捕获 2.事件冒泡
  js 默认就是开启冒泡事件，也就是从子元素向外部传

  事件冒泡
  当节点事件被触发时，会由内圈到外圈 div-->body-->html-->document 依次触发其祖先节点的同类型事件，直到DOM根节点

  事件捕获
  当节点事件被触发时，会从DOM根节点开始，依次触发其子孙节点的同类型事件，直到当前节点自身。由外圈到内圈 document-->html-->body-->div

# 事件委托
 利用 JS 事件冒泡动态为元素绑定事件的方法称为事件委托（Event Delegation，也称为“事件代理”），是 JavaScript 中最热门的技术之一。
 事件委托就是把原本需要绑定在子元素上的事件（onclick、onkeydown 等）委托给它的父元素，让父元素来监听子元素的冒泡事件，并在子元素发生事件冒泡时找到这个子元素。

# onload(),$(document).ready,DOMContentLoaded 的区别
  7.html

  load: 就是window.load(),页面初次渲染先不执行这个函数里面的
  $(document).ready:与window.onload()有异曲同工之妙，加载完某个dom结构之后再执行这个函数里面的
  DOMContentLoaded：DOM树构建完成

 DOM 文档的加载步骤：
  1. 解析HTML结构
  2. 加载外部的脚本和样式文件
  3. 解析并执行脚本代码
  4. DOM树构建完成   触发 DOMContentLoaded 事件-->  $(document).ready
  5. 加载图片等外部文件 
  6. 页面加载完毕  --- onload


# 实现继承的方式
8.js
  # 1.原型链继承
    缺点：1.会在子类实例上共享父类所有的引用类型实例属性  
          2.不能给父类构造函数传参


  # 2. 经典继承  （伪造对象）
    缺点：1.只能继承到父类构造函数里面的显示属性，但是不能继承到父类构造函数原型链上的属性
          2. 方法不能复用

  # 3. 组合继承（伪经典继承）
    原型链继承加经典继承
    不足：要调用两次父类的构造函数

  # 4.原型式继承
    缺点：子类会共享父类中引用类型的属性

  # 5.寄生式继承
      缺点：子类会共享父类中引用类型的属性


  # 6.寄生组合式继承



# js中编码，解码URL
9.js

let url ='werq'
encodeURI() 将一个字符串编译成url
decodeURI(encodeURI(url))   将一个url地址解码成字符串

# 手写new
new.js

# 手写ajax


# BOM? DOM?
BOM: 浏览器对象模型 window.history window.innerHeight window.innerWidth window.location

DOM: 文档对象模型

# substr() substring() 有什么区别
 
 var str="Hello world!"
 document.write(str.substr(3))  // lo world!
 substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。

 substring() 方法用于提取字符串中介于两个指定下标之间的字符。


# 手写instanceof
 instanceof 是顺着原型链去判断的，所以只要 某个值的隐式原型等于对象或者某个要判断的显示原型就可以

# 手写debounce

# 手写throttle

# 数组去重 
 shuzuquchong.js

 1. set
 2. map

# 用setTimeout 实现 setInterval

# 用setInterval 实现 setTimeout

# compose 合并 函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。
  compose.js

# 实现一个柯里化函数  !!!
  
# LRU 算法题   !!!

# 发布订阅机制

# 实现 parse
JSON.parse()

1. 使用eval
  function parse(json){
    return eval("("+json+")")   // eval接受的是一个字符串，用小括号把这个字符串拼接起来变成一个代码块
}


# DOM-tree





































