var reverseOnlyLetters = function(s) {
    s=[...s]
    let left=0,right=s.length-1
    let reg=/^[A-Za-z]+$/

    // console.log(s)

    while(left!==right){
        if(reg.test(s[left]) && reg.test(s[right])){
            let t =s[left]
            s[left]=s[right]
            s[right]=t
            left++
            right--
        }else if(reg.test(s[left]) && !reg.test(s[right])){
            right--
        }else if(!reg.test(s[left]) && reg.test(s[right])){
            left++
        }else{
            left++
            right--
        }
    }
    s=s.join('')
    return s
};