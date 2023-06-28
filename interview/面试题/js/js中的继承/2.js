SuperType.prototype.val = 123

function SuperType() {
  this.colors = ['red', 'blue', 'green']
}


function Type(t) {
  SuperType.call(this, t)
}

var instance1 = new Type()
instance1.colors.push('pink')

var instance2 = new Type()
console.log(instance2.val);