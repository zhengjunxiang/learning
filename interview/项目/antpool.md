### Antpool

架构：vue + ssr + 响应式布局

**ssr 实现：**

通过在服务端使用 vue-server-renderer 的 createRenderer 实例出 renderer 对象，通过 renderer.renderToStream 进行流式渲染，监听stream的 data、end 和 error 事件

```js
const stream = renderer.renderToStream(context)

let html = ''

stream.on('data', data => {
  html += data.toString()
})

stream.on('end', () => {
  console.log(html) // 渲染完成
})

stream.on('error', err => {
  // handle error...
})
```

打包配置：

webpack 分成两个配置文件，分别使用 vue-server-renderer/client-plugin 和 vue-server-renderer/server-plugin；分别加载不同的入口文件：entry-client 和 entry-server;

server 端以 commonjs 规范进行打包

入口文件：

分为 entry-client 和 entry-server，分别对应不同的执行环境，在 main.js 中提供 createApp 方法 Vue App，路由文件导出 createRouter 提供 router实例



**响应式布局：**

css 媒体查询 + rem 的方式：

当前设计中，不能单纯通过整体改变基础尺寸来实现，所以使用媒体查询，在不同的屏幕宽度使用不同样式；

使用 rem 是为了整体设置基础尺寸，方便统一修改整体风格样式，rem 通过js监听window的resize根据屏幕宽度来设置body下font-size


**优化手段：**

1.大小图片切换：

默认加载小图，应用渲染后，进行懒加载大图

2.减少服务端返回节点：

使用 client-only 包裹，应用中部分组件（table、走马灯），返回大体的结构节点

3.pc 和 移动端组件的 v-if 根据isPc全局变量，来判断是否渲染：

pc和移动端只渲染对应的组件，减小客户端实际渲染节点；

细节：isPc 在 app根组件的 created 生命周期中进行，根据屏幕宽度来进行设置，并监听window resize 事件

4.和服务端配合使用 service-work，进行客户端离线缓存

5.服务端进行返回资源缓存

使用 router-cache 进行 express 路由缓存，lru-cache 进行组件缓存，打包后的资源文件进行 express.static 静态文件处理等

6.在服务端根据请求的url 设置页面的title，根据 query 参数、 Accept-Langage 和 cookie 来设置语言，保存到 context 中，提供给客户端中使用；

防止客户端页面语言与服务端的返回的语言不一致，造成页面语言闪烁的问题
