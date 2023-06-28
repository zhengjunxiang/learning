SuperType.prototype.getSuperValue = function () {
    return this.property
}

function SuperType(t) {
    this.property = t
    this.like = {
        sport: 'running',
        book: 'js'
    }
    this.age = 18
}

Type.prototype = new SuperType () 


function Type(t) {
    this.typeproperty = t
}

var instance1 = new Type(false)

var instance2 = new Type(false)

instance1.age = 20

console.log(instance2);


