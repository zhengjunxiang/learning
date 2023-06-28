function Person(name, age) {
    this.name = name
    this.age = age
    this.like = {
        sport: 'running',
        book: 'JavaScript'
    }
    this.getName = function () {
        console.log(this.name);
    }
}
Person.prototype.sayHello = function () {
    console.log('你好');
}

function Student(name, age) {
    Person.call(this, name, age)  // 借用构造函数
}
const Fn=function(){}
Fn.prototype=Person.prototype

Student.prototype = new Fn()



let s1 = new Student('bruce', 18)
s1.sayHello() // 你好
console.log(s1);