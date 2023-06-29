// 贪心 === 最优解

// 给出n个大小为s1, s2,... , sn，价值为v1 ,v2,...,vn的物品，并设背包容量为C。
// 试设计一个贪心算法，找到非负实数x1,x2,…xn使和\sum xi*v i(从1到n求和)，在约束\sum xi*si（从1到n求和）<=C下最大。

// 商品   重量  价格
// 猕猴桃  2    2
// 苹果    3    4
// 哈密瓜  4    5

// [2, 3, 4] --- 
// [2, 4, 5]


// 背包体积是 6，装出来最值钱的水果    5, 6

function knapSack(capacity, weights, values) {
  
    let arr = []
    for (let i = 0; i < weights.length; i++) {
      let obj = {
        value: values[i],
        weight: weights[i],
        ratio: (values[i] / weights[i]).toFixed(2) // 商品的价值比
      }
      arr.push(obj) // [{value: 2, weight: 2}, {value: 4, weight: 3}, {value: 5, weight: 4},]
    }
    arr = arr.sort((a, b) => {
      return b.ratio - a.ratio
    })
  
    let load_all = 0, val_all = 0, max = 0, flag = 0;
    let charArray = [], n = 0;
  
    function add() {
      if (flag > arr.length) return
      while (load_all <= capacity) {
        charArray[n++] = arr[flag]
        load_all += arr[flag].weight
        val_all += arr[flag].value
      }
      
      isOver()
    }
    add()
  
    function isOver() {
      if (load_all > capacity) {
        charArray.pop()
        load_all -= arr[flag].weight
        val_all -= arr[flag].value
        // 能不能放下性价比其次的商品
        for (; flag < arr.length; flag++) {
          if (arr[flag].weight <= (capacity - load_all)) {
            add()
          }
        }
        // flag++
        // add()
      }
    }
  
    console.log(charArray);
  }
  
  
  // knapSack(6, [2, 3, 4], [2, 4, 5])
  
  
  
  
  // leetCode455
  let g = [ 2, 3, 4], s = [1, 1, 1, 1, 1, 1]
  
  var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
  
    // let n = 0, j = 0
    // for (let i = 0; i < g.length; i++) {
      
    //   while (j < s.length) {
    //     if (g[i] <= s[j]) {
    //       n++
    //       j++
    //       break
    //     } else {
    //       j++
    //     }
    //   }
  
    // }
    // return n
  
    // 局部最优解：要能满足孩子，还要消耗最少，将较小的饼干分给胃口最小的孩子
    // 排序胃口数组和饼干数组，遍历饼干数组，找打能满足胃口最小的孩子的饼干
    // 
    let i = 0
    s.forEach(n => {
      if (n >= g[i]) {
        i++
      }
    });
    return i
  };
  
  
  console.log(findContentChildren(g, s));