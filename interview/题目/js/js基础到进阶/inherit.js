// 原型链继承

// function SuperType(t){
//     this.property=t
// }

// function Type(t){
//     this.typeproperty=t
// }

// // let instance1=new Type()
// // console.log(instance1.typeproperty);  // fasle
// // console.log(instance1.property);  // undefined

// // 原型链继承，
// Type.prototype=new SuperType()
// let instance2=new Type(fasle)
// console.log(instance2.property);  // true


// 经典继承
// SuperType.prototype.name='bruce'

// function SuperType(){
//     this.color=['red','green','black']
// }

// function Type(){
//     SuperType.call(this)
// }

// let type=new Type()

// console.log(type.name); //undefined



// 组合继承
// SuperType.prototype.sayName=function(){
//     console.log(this.name);
// }

// function SuperType(name){
//     this.color=['red','yellow','blue']
//     this.name=name
// }

// function Type(age,name){
//     this.age=age
//     SuperType.call(this,name)  //子类的构造函数继承到了父类的实例属性，但是现在子类继承不到父类原型上的属性
// }

// Type.prototype=new SuperType()   // 子类的原型继承到父类的属性
// Type.constructor=Type   // 因为此时子类的原型被父类实例覆盖了，此时没有了构造器属性

// let son =new Type(18,'bruce')

// son.sayName()  //bruce


// 原型式继承

// function object(o){
//     function F(){}
//     F.prototype=o
//     return new F()
// }

// const person={
//     sex:'man',
//     age:20,
//     like:{
//         sports:'running'
//     }
// }

// let r1=object(person)
// console.log(r1.like);// { sports: 'running' }
// let r2=object(person)
// r2.like.sports='singing'
// console.log(r1.like); // { sports: 'singing' }


SuperType.prototype.sayName=function(){
    console.log(this.name);
}
function SuperType(name){
    this.name=name
    this.color=['red','yellow','blue']
}

function Type(age,name){
    this.age=age
    SuperType.call(this,name)
}

let proto=Object.create(SuperType.prototype)
proto.constructor=Type

Type.prototype=proto

let p1=new Type(12,'jack')
let p2=new Type(12,'bruce')

