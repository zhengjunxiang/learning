let A = [1, 2, 3, 4]
let B = [2, 3, 4, 5]

const mergeSort = (A, B) => {
    let i = 0, j = 0
    let arr = []
    while (A[i] && B[i]) {
        if (A[i] <= B[j]) {
            arr.push(A[i])
            i++
        } else {
            arr.push(B[j])
            j++
        }
    }
    arr =[...arr,...A.slice(i,A.length),...B.slice(j,B.length)]
    return arr
}

console.log(mergeSort(A,B));