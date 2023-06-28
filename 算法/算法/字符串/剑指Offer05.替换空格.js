// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

//  

// 示例 1：

// 输入：s = "We are happy."
// 输出："We%20are%20happy."


//思路就是将这个字符串转成数组，然后再更改数组里面的值，再将数组转换成字符串


var replaceSpace = function(s) {
    var arr=Array.from(s);
    for(let i=0;i<arr.length;i++){
        if(arr[i]===" "){
            arr[i]="%20";
        }
    }

    return arr.join("")

};

