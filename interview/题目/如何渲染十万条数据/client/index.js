const getList = () => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('get', 'http://127.0.0.1:3000')
      xhr.send()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
    })
  }
  
  const renderList = async(parent) => {
    console.time('渲染时间')
    const list = await getList()
    // list.forEach(item => {
    //   const div = document.createElement('div')
    //   div.className = 'item'
    //   div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
    //   parent.appendChild(div)
    // })

    // 分页渲染
    const page=0
    const limit = 200
    const totalPage=Math.ceil(list.length/limit)

    const render=(page)=>{
        if(page>=totalPage) return 
        requestAnimationFrame(()=>{   // 或者用setTimeout   这个方法在没有修改dom的几何属性的时候就不会进行重排
            for(let i=page*limit;i<page*limit+limit;i++){
                const item=list[i]
                const div = document.createElement('div')
                div.className = 'item'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                parent.appendChild(div)
            }
            render(page+1)
        },0)
    }



    // 分页渲染+文档碎片

    //     const render=(page)=>{
    //     if(page>=totalPage) return 
    //     requestAnimationFrame(()=>{   // 或者用setTimeout   这个方法在没有修改dom的几何属性的时候就不会进行重排

    //         // 创建一个文档碎片
    //         const fragment = document.createDocumentFragment()  // 创建一个假的dom


    //         for(let i=page*limit;i<page*limit+limit;i++){
    //             const item=list[i]
    //             const div = document.createElement('div')
    //             div.className = 'item'
    //             div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
    //             fragment.appendChild(div)  // 往虚拟的dom上添加dom，不会发生重排
    //         }

    //         parent.appendChild(fragment)
    //         render(page+1)
    //     },0)
    // }

    renderList(page)
    console.timeEnd('渲染时间')

  } 


  
