// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。

// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

//  

// 示例 1：

// 输入：s = "Hello World"
// 输出：5
// 解释：最后一个单词是“World”，长度为5。
// 示例 2：

// 输入：s = "   fly me   to   the moon  "
// 输出：4
// 解释：最后一个单词是“moon”，长度为4。
// 示例 3：

// 输入：s = "luffy is still joyboy"
// 输出：6
// 解释：最后一个单词是长度为6的“joyboy”。


var lengthOfLastWord = function(s) {
    var index=s.length-1
    while(s[index]===' '){
        index--
    }
    if(index===0){
        return 1-index
    }
    for(let i=index;i>=0;i--){
         if(s[i]===' ' && index>i){
             return index-i
         }
         if(i===0){
        return index+1//'day'这个例子，如果从后往前数碰不到空格就这样返回
       }
    }
};


//感觉这道题目很简单，但是却写了很久很多遍，用不同的手段来实现上面一样的思路，但是却都没有成功