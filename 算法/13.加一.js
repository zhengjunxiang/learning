// /**

var plusOne = function(digits) {
  var index=digits.length-1
  if(digits[index]!==9){
      digits[index]+=1
       return digits
  }else{
      if(digits[index]===9 && digits.length===1){
          digits[index]=0
          digits.unshift(1)
          return digits
      }
       while((digits[index]===9 && index>0) || digits[index]===10){
           digits[index]=0
           if(index!==0){
               digits[index-1]+=1
               if(digits[index-1]!==10){
                   return digits
               }
           }else if(index===0 && digits[index]===0){
               digits.unshift(1)
               return digits
           }else{
               digits[index]+=1
               return digits
           }
           index--
       }
  }
  return digits
};