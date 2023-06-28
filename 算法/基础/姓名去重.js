let arr = ['tom', 'Tom', 'jack', 'bruce', 'Bruce', 'Hello World', 'helloworld']

const nameSort = names => {
    names.forEach((value, index) => {
        names[index] = value.toLowerCase()
    });
    return [...new Set(names)]
}

// 数组去重
