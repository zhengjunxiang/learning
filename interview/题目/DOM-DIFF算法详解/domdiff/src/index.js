import { createElement, render, renderDom } from './element.js'
import diff from './diff'
import patch from './patch'

// 产生虚拟dom 结构  原来的
let vertualDom1 = createElement('ul', { class: 'list' }, [     // 创建一个虚拟对象
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])
// 修改后生成的虚拟 dom  现在的
let vertualDom2 = createElement('ul', { class: 'list-dasi' }, [     // 创建一个虚拟对象
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['2']),
    // createElement('li', { class: 'item' }, ['5'])
])

let patchs=diff(vertualDom1,vertualDom2)
console.log(patchs);


// 将虚拟dom转换成真实dom 渲染到页面
let el = render(vertualDom1)
renderDom(el, window.root)   // 挂载到页面上

// 给老的打补丁
patch(el,patchs)

console.log(el);


 

// DOM Diff 算法比较的是 两个虚拟dom 结构：用修改后生成的虚拟dom 结构与上一次生成的虚拟 dom 比较，也就是比较两个对象
//  目标： 以最小的代价更新 dom；作用：根据两个虚拟对象创建出不同的补丁，补丁就是用来更新dom 的
// diff 是同层级对比
