function findApproachNumber(arr, x) {
    let minVal = '', len = arr.length, minDiff = null;
    if (len <= 2) return arr;
    for(let i = 0; i < len - 1; i++) {
        for(let j = i; j < len - 1; j++) {
            const sum = arr[j] + arr[j+1], diff = Math.abs(sum - x);
            if (sum === x) return [j, j+1];
            if (minDiff === null || minDiff > diff) (minDiff = diff) && (minVal = `${arr[j]}-${arr[j+1]}`)
        }
    }
    return minVal.split("-").map(item => item - 0);
}

console.log(findApproachNumber([1,2,4,5,7,2,4,63,6], 10))
