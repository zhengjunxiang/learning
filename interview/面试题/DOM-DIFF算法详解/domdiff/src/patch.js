import { Element, render } from './element'

let allPatches;
let index = 0 // 记录当前正在给那个节点打补丁

function patch(node, patches) {
  console.log(node);
  // 给某个节点打补丁
  allPatches = patches

  walk(node)
}

function walk(node) {
  let currentPatch = allPatches[index++] || []
  let childNodes = node.childNodes
  childNodes.forEach(child => walk(child));

  if (currentPatch.length > 0) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTRS':
        break;
      case 'TEXT':
        node.textContent = patch.text
        break;
      case 'REMOVE':
        break;
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break;
      default:
        break;
    }
  })
}

export default patch