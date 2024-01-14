type MyPick<O extends Object, K extends keyof O> = {
  [key in K]: O[key]
}

type Jeam = {
  name: string,
  age: number
}

type NameType = MyPick<Jeam, 'name'>

type MyReadOnly<O extends Object> = {
  readonly [key in keyof O]: O[key]
}

type ReadOnlyJeam = MyReadOnly<Jeam>