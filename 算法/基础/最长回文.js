/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length;
  let maxStr = ''
  for (let i = 0; i < len; i++) {
      let currentStr = s[i];
      let l = i - 1;

      while (s[i] === s[i+1]) {
          currentStr += s[i];
          i++
      }

      let r = i + 1;
      
      while (l >= 0 && s[l] === s[r]) {
          currentStr = s[l] + currentStr + s[r]
          r++;
          l--;
      }
      
      if (currentStr.length > maxStr.length) {
          maxStr = currentStr
      }
  }
  return maxStr
};

const str = longestPalindrome("aba")
console.log("str", str)
