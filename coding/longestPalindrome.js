var longestPalindrome = function(s) {
    let n = s.length;
    let res = '';
    let dp = Array.from(new Array(n),() => new Array(n).fill(0));
    //考虑到 主要的递推关系 是由已知子串 i+1..j-1 的情况， 递推到 i..j 的情况， 因此，迭代过程需要反序迭代变量 i ，正序迭代 j
    for(let i = n-1;i >= 0;i--){
        for(let j = i;j < n;j++){//(j - i < 2)单个字符肯定是回文串
            //dp[i+1][j-1] 且 s[i] == s[j] 则dp[i][j]肯定是回文串
            if (s[i] == s[j] && (j - i < 2 || dp[i+1][j-1])) {
                dp[i][j] = true
            }
            // 如果dp[i][j]是回文 就记录最大的值(j - i +1)表示长度
            if(dp[i][j] && j - i +1 > res.length){
                res = s.substring(i,j+1);
            }
        }
    }
    return res;
};

console.log(longestPalindrome('dsfdrtfhjgfdsaffdgtrefw4gtdfsfaefrttkughfngdbfsdfaswresteyryukymhgfnbdfvsdaewrtyhgfdsewrteyrutyiulkjhgfdserthyjghmnvbcvxcdsrethfgbf'))