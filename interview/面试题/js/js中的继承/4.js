function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

var person = {
    name:'小李',
    age:18,
    like:{
        sports:'eating'
    }
}

var obj = object(person)
obj.like.sports = 'running'

var obj1 = object(person)

console.log(obj1);

var obj2 = Object.create(person)