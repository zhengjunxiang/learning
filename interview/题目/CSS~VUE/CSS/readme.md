# 盒子模型
1. content
2. border
3. padding
4. margin

- 标准盒模型
  1. width 指的是 content的宽度
  2. 盒子总宽度 = width + padding + border
- IE盒模型
  1. width 指的是 content的宽度 + padding + border


- box-sizing: 用于定义引擎如何计算元素的总高度和总宽度
  1. border-box： IE盒模型,宽度从border开始算
  2. border-box： 标准模型，宽度总content开始算


# css选择器有哪些? css优先级？哪些可以继承？
1. id (#box)
2. class (.wrap)
3. 同级 (.one + .two)
4. 子级选择 (.one > .one_1)
5. 伪类选择器 (:first-child, :link, :hover...)
6. 标签 (div)
7. 群组 (.wrap, .box)
8. 后代 (#box div)
9. 伪元素选择器 (:before, :after, :first-line, :first-letter)
10. 属性选择器 (input[value='name'])
11. 层次选择器 (:nth-child(n), :disabled)

!important > 内联 > ID > 属性选择器 > 类名选择器 > 标签

- 继承
font-size:
font-family:
font-weight:


# em  px  rem  vh  vw
  em: 相对于自身的font-size大小来计算，如果自身没有设置font-size，按父容器
  rem: 相对于跟字体大小
  px: 绝对单位，
    1. 视觉像素
    2. 物理像素

  375px     750px


  100px     200px

  vw/vh: 相对于设备可视区域的宽高


# 物理像素，css像素，dpr，ppi， 设备独立像素（分辨率）
1. css像素（css pixel px）, px是长度单位，相对于物理像素，页面缩放比为1,css中1px = 1物理像素

2. dpr (device pixel ratio), 物理像素 / 设备独立像素（1440 x 900）
  dpr = 1 : 1， css 1px = 1物理像素
  dpr = 2 : 1,  css 1px = (2 * 2) 个物理像素
  dpr = 3 : 1,  css 1px = (3 * 3) 个物理像素

  window.devicePixelRatio()

3. ppi 每英寸的像素（像素密度）

  分辨率 X x Y

  ppi = image.png


# css 隐藏页面元素
1. display: none  触发重排和重绘，无法响应点击事件
2. visibility: hidden  不触发重排，触发重绘，无法响应点击事件
3. opacity: 0   不触发重排，触发重绘，响应点击事件
4. width:0;height:0  触发重排和重绘，无法响应点击事件
5. clip-path: polygon() 不触发重排，触发重绘, 无法响应点击事件
6. position: absolute; 不触发重排(脱离了文档流)，触发重绘, 无法响应点击事件


# BFC
 - BFC是什么
  块级格式化上下文，它是一个渲染区域，有一套属于自己的渲染规则，
    1. 同一个BFC内的两个相邻的盒子会发生margin重叠
    2. BFC区域不会和float的元素重叠
    3. BFC计算高度，浮动子元素也参与
    4. BFC就是页面上的一个隔离的独立容器，容器里面的元素不会影响外面的元素

 - 触发条件
  1. 浮动元素：float值为left、right
  2. overflow值不为 visible，为 auto、scroll、hidden
  3. display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
  4. position的值为absolute或fixed

 - 应用场景
  1. 防止margin的重叠
  2. 清除浮动
  3. 自适应的多栏布局


# 水平垂直居中
  1. 子容器定宽高：margin
  2. flex布局
  3. position + transform
  4. 子容器定宽高：position + margin
  5. table布局
  6. grid网格布局

# 两栏布局右侧自适应? 三栏布局中间自适应？
  1. 两栏布局: flex、float+BFC
  2. 三栏布局: 
  float、 
  flex、 
  float + 负margin、 (双飞翼)
  absoult + margin、 
  table布局
  grid布局

