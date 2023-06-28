// const { Generated } = require("@babel/traverse/lib/path/lib/virtual-types");

// function* foo(){
//     yield "hello"
//     yield "world"

//     return "ending"
// }

// const res=foo()

// console.log(res.next());  // hello
// console.log(res.next());  // world
// console.log(res.next());  // vaLue:ending done:true

function* gen(x){
    console.log(y);
    var y=yield x+2
    console.log(y);
    return y
}

var g=gen(1)
console.log(g.next());  // 此时gen执行到了什么效果 value=3
console.log(g.next());  // 覆盖上一个next执行的结果