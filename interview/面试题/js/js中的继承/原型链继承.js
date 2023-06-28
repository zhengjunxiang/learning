function Person() {
    this.name = 'bruce'
    this.age = 18
    this.gender = '男'
    this.like = {
        sport: 'running',
        book: 'JavaScript'
    }
    this.getName = function () {
        console.log(this.name);
    }
}

// function Student(color) {
//     this.school = '新华小学'
//     this.color = color
//     this.get=function(){
//         console.log(this.color);
//     }
// }

// // let s = new Student()
// // console.log(s.name);   // 未继承前 undefined

// Student.prototype = new Person()  // 继承之后
// let s = new Student('china')
// console.log(s.country);
// console.log(s.color);
// let s1 = new Student()
// s1.getName()  // bruce
// console.log(s1.like.book);  // JavaScript
// s1.like.book = 'Java'   // 修改引用类型的值
// s1.name = 'jack'  // 修改非引用类型的值
// console.log(s1.like.book);  // Java
// s1.getName()  // jack
// console.log('----------');
// let s2 = new Student()
// s2.getName()  // bruce
// console.log(s2.like.book);  // Java



function Person(t) {
    this.property = t
}

function Student(t) {
    this.typeproperty = t
}
Student.prototype = new Person()
let s=new Student('a')
console.log(s.property)  // undefined
console.log(s.typeproperty)  // a