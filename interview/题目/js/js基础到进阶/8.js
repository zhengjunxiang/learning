Animal.prototype.eat = function(food) {
    console.log(this.name + 'eating' + food);
  }
  function Animal(name) {
    this.name = name || 'Animal'
    this.sleep = function() {
      console.log(this.name + 'sleeping');
    }
  }
  
  
  var anothorPrototype = Object.assign(Cat.prototype,Animal.prototype)
  Cat.prototype = anothorPrototype
  function Cat(name) {
    Animal.call(this)
    this.name = name
  }
  
  var cat = new Cat('Tom')
  
  cat.sleep() // 
  cat.eat('fish') // 