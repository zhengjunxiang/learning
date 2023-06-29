# 类型
- js类型有哪些？
- 大数相加，相乘的算法题
- 
 string number Boolean null undefined Symbol BigInt

object -- array set map gRegExp Date Math
Function

// 原始类型与引用类型存在的位置不同

# 类型判断
typeof:判断function为function 
 null-->object   在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"
 
instanceof: 
Object.prototype.toString.call()
Array.isArray()
isNaN

# 类型转换

- 强制转换
xxx.toString()

- 隐式转换
对象转原始类型会调用
valueOF()
toString()

- 在四则运算中，其中一方是字符串，就会把另一方也转成字符串
- 在四则运算中，其中一方是数字，就会把另一方也转成数字


- == & ===
[] == ![]  true  
! 先转为boolean值