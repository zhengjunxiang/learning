function createPerson(original) {
    var clone = Object.create(original)
    clone.say = function() {     // 增强这个对象
        console.log('hello');
    }
    return clone
}