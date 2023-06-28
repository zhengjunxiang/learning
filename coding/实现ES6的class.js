// Parent
function Parent(name) {
  this.name = name
}
Parent.prototype.sayName = function () {
  console.log(this.name)
};

// Child
function Child(age, name) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = Object.create(Parent.prototype)  // 原型拷贝
Child.prototype.constructor = Child // 重置子类constructor，否则子类实例constructor将指向Parent

Child.prototype.sayAge = function () {
  console.log(this.age)
}

// 测试
const child = new Child(20, 'poetry')
child.sayName()
child.sayAge()
