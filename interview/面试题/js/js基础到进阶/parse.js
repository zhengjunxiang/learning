// 给你一个字符串，请你实现 JSON.parse()
// JSON.parse() 将字符串解析成一个JSON 对象
let p = '{ "name":"bruce" , "like": { "n":2} }'

// console.log(JSON.parse(p));

// 方法一
// function parse(json){
//     return eval("("+json+")")   // eval接受的是一个字符串，用小括号把这个字符串拼接起来变成一个代码块
// }





console.log(parse(p));