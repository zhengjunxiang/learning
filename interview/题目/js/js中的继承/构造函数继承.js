function Person(name,age) {
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

let s1 = new Student('bruce',18)
s1.sayHello()  // s1.sayHello is not a function
// s1.getName()   // bruce
// s1.name='jack'
// s1.getName()  // jack
// s1.like.sport='swimming'
// console.log(s1.like.sport);  // swimming
// console.log('------');
// let s2=new Student('lucy',19)
// s2.getName()  // lucy
// console.log(s2.like.sport);  // running

// console.log(s1.sayHello());  // s1.sayHello is not a function

/*
   做法：
     1. 写出大分类的构造函数
     2. 在小分类的构造函数中使用 call 进行借用大构造函数.call(this,参数)

     能实现属性的继承，但是实现不了方法的继承
*/