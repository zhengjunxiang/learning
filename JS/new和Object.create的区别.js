// 直接字面量创建
var objA = {};
objA.name = 'a';
objA.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
// var objA = {
//     name: 'a',
//     sayName: function() {
//         console.log(`My name is ${this.name} !`);
//     }
// }
objA.sayName();
console.log(objA.__proto__ === Object.prototype); // true
console.log(objA instanceof Object); // true

// new关键字创建
var objB = new Object();
// var objB = Object();
objB.name = 'b';
objB.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
objB.sayName();
console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true

// Object.create()
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person); // me.__proto__ === person
me.name = "Matthew"; // name属性被设置在新对象me上，而不是现有对象person上
me.isHuman = true; // 继承的属性可以被重写
me.printIntroduction(); // My name is Matthew. Am I human? true

var a = Object.create(null);
console.dir(a); // {}
console.log(a.__proto__); // undefined
console.log(a.__proto__ === Object.prototype); // false
console.log(a instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

var bb = Object.create(null, {
  a: {
      value: 2,
      writable: true,
      configurable: true
  }
});
console.dir(bb); // {a: 2}
console.log(bb.__proto__); // undefined
console.log(bb.__proto__ === Object.prototype); // false
console.log(bb instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

// ----------------------------------------------------------

var cc = Object.create({b: 1}, {
  a: {
      value: 3,
      writable: true,
      configurable: true
  }
});
console.log(cc); // {a: 3}
console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false 说明第二个参数设置的是新对象自身可枚举的属性
console.log(cc.__proto__); // {b: 1} 新对象cc的__proto__指向{b: 1}
console.log(cc.__proto__ === Object.protorype); // false
console.log(cc instanceof Object); // true cc是对象，原型链上肯定会出现Object

Object.mycreate = function(proto, properties) {
  function F() {};
  F.prototype = proto;
  if(properties) {
      Object.defineProperties(F, properties);
  }
  return new F();
}
var hh = Object.mycreate({a: 11}, {mm: {value: 10}});
console.dir(hh);

