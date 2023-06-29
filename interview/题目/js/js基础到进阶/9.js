var url = 'abc.php?name=tom&occupation=pantNg'

console.log(encodeURI(url));
encodeURI() // 将一个字符串编译成url


decodeURI(encodeURI(url))