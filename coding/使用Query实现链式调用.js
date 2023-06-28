class Query {
    constructor(data) {
      this.data = data
    }
    cbs = []
    _where = (fn) => {
        return this.data.filter(fn)
    }
    _orderBy = (str) => {
      return this.data.sort((a, b) => a[str] - b[str])
    }
    _groupBy = (group) => {
        const res = {}, arr = []
        this.data.forEach(cur => {
          if(!res[cur[group]]) {
            res[cur[group]] = [cur]
          } else {
            res[cur[group]].push(cur)
          }
        })
        Object.keys(res).forEach((key) => {
            return arr.push(res[key])
        })
        return arr
    }
    where = (fn) => {
      this.cbs.push(() => this._where(fn))
      return this
    }
    orderBy = (str) => {
      this.cbs.push(() => this._orderBy(str))
      return this
    }
    groupBy = (str) => {
      this.cbs.push(() => this._groupBy(str))
      return this
    }
    execute = () => {
      let res = []
      this.cbs.forEach(cb=> {
        res = cb()
        console.log('res', res)
      })
      return res
    }
  };
  const data = [
    { name: 'foo', age: 16, city: 'shanghai' },
    { name: 'bar', age: 24, city: 'hangzhou' },
    { name: 'fiz', age: 22, city: 'shanghai' },
    { name: 'baz', age: 19, city: 'hangzhou' }
  ];
  function query(data) {
        return new Query(data);
    }
    console.log(query(data)
      .where(item => item.age > 18)
    .orderBy('age')
    .groupBy('city')
    .execute())
