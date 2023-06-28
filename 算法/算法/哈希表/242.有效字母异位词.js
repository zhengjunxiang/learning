// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

// 思路：先判断长度，因为判断的是字母，所以可以将每个字母存储到一个长度为26的数组里面，循环遍历第一个字符串，然后哪个字母出现就哪个数字加加，
//  再去第二个字符串里面去判断，如果改字符串里面不存在低于i给字符串里面的，那么就直接返回false 否则就一直循环

var isAnagram = function(s, t) {
    if(s.length!=t.length){
        return false;
    }
    const arr=new Array(26).fill(0);
    const base='a'.charCodeAt();
    for(let i=0;i<s.length;i++){
        arr[s[i].charCodeAt()-base]++;
    }
    for(let i=0;i<t.length;i++){
        if(!arr[t[i].charCodeAt()-base]) return false;
        arr[t[i].charCodeAt()-base] --;
    }
    return true;
};