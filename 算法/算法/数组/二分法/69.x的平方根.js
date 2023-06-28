// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

//  

// 示例 1：

// 输入：x = 4
// 输出：2
// 示例 2：

// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

var mySqrt = function(x) {
    if(x==1) return 1
    if(x==0) return 0
    let min=0;
    let max=x;
    let res=-1
    while(min<=max){
        let middle=Math.round((max+min)/2)
        if(middle*middle<=x){
            res=middle
            min=middle+1
            
        }else{
            max=middle-1
        }
    }
     return res
};

// 主要核心就是要知道 middle的平方与目标的大小关系
