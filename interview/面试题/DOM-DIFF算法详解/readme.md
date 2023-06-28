# 为什么要用虚拟 DOM
 解决
 # 虚拟dom
  createElement => {type,props,children}


1. 虚拟dom 转化成 真实dom
2. 新旧dom 对比：维护出一份补丁：对比新旧虚拟对象，找出不同的地方
3. 将真实dom 结构挂载到 html 上：渲染修改后的dom

# Diff 算法的三个策略

1. 一一对应的比较
2. 只比较同层级，一旦找到不一样的节点就会替换
3. 在同层级内出现节点位置变化，就不需要重新创建节点（可以复用）

思路：
1. 虚拟dom 怎么创造出来的？
2. 虚拟dom 怎么转化（映射）成真实 dom结构
3. 虚拟dom 结构发生变化如何做diff 算法修改dom 结构

# 补丁  记录当前变化
1. 当节点类型相同时，对比属性是否相同，如果不同就产生一个属性的补丁包 { type:'ATTRS',attrs:{class:'list-group' }}
2. 新的dom 节点不存在，{type:'REMOVE',index:xxx}
3. 节点对应位置上的类型不同，直接采用替换模式 {type:'REPLACE',newNode:xxx}
4. 文本变化{type:'TEXT',text:1}
