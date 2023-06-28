let lines = ['192.168.1.1', '192.118.2.1', '192.168.1.1']


const highestFrequency = function (ipLines) {
    let [obj, max, name] = [{}, 1, '']

    ipLines.forEach(value => {
        if (obj[value]) {
            obj[value]++
            if (max < obj[value]) {
                max = obj[value]
                name = value
            }
        } else {
            obj[value] = 1
        }
    });
    return name
}

let obj = {}
obj[value] = 1
console.log(obj[value]);