// {/* <div>
//   <span></span>
//   <ul>
//     <li></li>
//     <li></li>
//   </ul>
// </div> */}

// // {
// //   tag: 'DIV',
// //   children: [
// //     { tag: 'SPAN', children: [] },
// //     {
// //       tag: 'UL',
// //       children: [
// //         { tag: 'LI', children: [] },
// //         { tag: 'LI', children: [] },
// //       ]
// //     }
// //   ]
// // }


// function domToTree(dom) {
//   let obj = {}
//   obj.tag = dom.tagName
//   obj.children = []

//   dom.childNodes.forEach(child => {

//     obj.children.push(domToTree(child))

//   });
//   return obj
// }

// console.log(domToTree(document.getElementById('wrap')));






obj = {
    tag: 'DIV',
    children: [
      { tag: 'SPAN', children: [] },
      {
        tag: 'UL',
        children: [
          { tag: 'LI', children: ['hello'] 
          },
          { tag: 'LI', children: [] },
        ]
      }
    ]
  }
  
  function _render(vnode) {
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode)
    }
  
    const dom = document.createElement(vnode.tag)
    vnode.children.forEach(child => {
      dom.appendChild(_render(child))
    });
  
    return dom
  }