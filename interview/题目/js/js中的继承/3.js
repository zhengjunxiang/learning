SuperType.prototype.sayName = function() {
    console.log(this.name);
  }
  
  function SuperType(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
  }
  
  
  function Type(age, name) {
    this.age = age
    SuperType.call(this, name)
  }
  Type.prototype = new SuperType()
  Type.prototype.constructor = Type
  
  Type.prototype.sayAge = function() {   // 这里能访问这个属性是因为在将Type的原型更改之后，然后再向Type的原型上添加属性
    console.log(this.age);
  }
  
  var instance1 = new Type(18, '宇航')
  
  instance1.sayName()
  instance1.sayAge()
  