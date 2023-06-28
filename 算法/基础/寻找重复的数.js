var findRepeatNumber = function (nums) {
  let m = {}, r = []
  for (let num of nums) {
      if (m[num]) r.push(num);
      m[num] = 1;
  }
  return new Set(r)
};
const repeatNumers = findRepeatNumber([2,3,22,33,4,3,2]);
console.log("repeatNumers", repeatNumers)