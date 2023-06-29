function Person(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}
Person.prototype.sayHello = function () {
    console.log('你好');
}

function Student(name, age, gender) {
    Person.call(this, name, age, gender)  // 借用构造函数
}
Student.prototype = new Person()
// Student.prototype.constructor=Student

let s1 = new Student('bruce', 14, '男')
// console.log(s1);
s1.sayHello()
// console.log(s1.sayHello());

/*
   做法：
     1. 写出大分类的构造函数
     2. 在小分类的构造函数中使用 call 进行借用大构造函数.call(this,参数)

     能实现属性的继承，但是实现不了方法的继承,还要借助另一个方式
     原型继承：
     做法：
        小分类的构造函数.prototype =大分类的示实例
*/