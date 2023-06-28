// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 例如，121 是回文，而 123 不是。
//  

// 示例 1：

// 输入：x = 121
// 输出：true
// 示例 2：

// 输入：x = -121
// 输出：false
// 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。



var isPalindrome = function (x) {
    var str = x.toString();
    var length = str.length;
    var flag=false
     if(length==1){
        return true
    }
    var med;
    if (length % 2 == 0) {
        med = length / 2;
        for (var j = 0; j < length / 2; j++) {
            if (str[j] == str[length - j - 1]) {
                flag=true
            }
            else {
               return false
            }
        }
    }
    else {
        med = (length - 1) / 2;
        for (var i = 0; i < med; i++) {
            if (str[i] == str[str.length - 1 - i]) {
              flag=true
            }
            else {
                return false
            }
        }
    }
return flag
};

//1.return console.log(true)  这样写是错误的
//这里不能直接return true 因为若直接return的话会造成只判断了最外层的一次 从而造成里面的数字没有进行比较