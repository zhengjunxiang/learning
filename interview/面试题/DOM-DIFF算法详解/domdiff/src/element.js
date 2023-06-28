class Element {
    constructor(type, props, children) {
        this.type = type
        this.props = props  
        this.children = children
    }
}
// 设置属性的方法
function setAttr(node, key, value) {   // 帮谁设置属性 什么属性 具体属性
    switch (key) {
        case 'value':   // <input value='123/>
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.key = value
            } else {
                node.setAttribute(key, value)
            }
            break;
        case 'style':
            node.style.cssText = value
            break;
        default:
            node.setAttribute(key, value)
    }
}

// 创建元素节点
function createElement(type, props, children) {   // 类型 属性 子节点
    return new Element(type, props, children)   // 创建元素节点
}

// 将虚拟dom转化成真实dom
function render(eleObj) {    // 读取虚拟对象，然后递归的
    let el = document.createElement(eleObj.type)
    for (let key in eleObj.props) {
        // 设置属性的方法
        setAttr(el, key, eleObj.props[key])
    }

    eleObj.children.forEach(child => {
        child = child instanceof Element ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    });
    return el
}

function renderDom(el, target) {  // 要渲染的节点  渲染的目标
    target.appendChild(el)
}














export { createElement, render, Element, renderDom }