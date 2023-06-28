const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REPLACE = 'REPLACE'
const REMOVE = 'REMOVE'
let Index=0

function diff(oldTree, newTree) {
    // 所有节点的补丁
    let patches = {}
    let index = 0
    // 递归，比较后的结果放进补丁包中
    walk(oldTree, newTree, index, patches)

    return patches
}

// 比较某个节点属性
function diffAttr(oldAttrs, newAttrs) {
    let patch = {}
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key] // 有可能是undefined
        }
    }

    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch
}
// 比较两个节点的所有子节点不同
function diffChildren(oldChildren, newChildren, index, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index了
        walk(child, newChildren[idx], ++Index, patches)
    });
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}


function walk(oldNode, newNode, index, patches) {
    // 当前节点的所有补丁
    let currentPatch = []

    if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) {
        let attrs = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs: attrs })
        }

        // 如果当前这个节点有子节点
        diffChildren(oldNode.children, newNode.children, index, patches)
    }
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
        console.log(patches);
    }
}

export default diff