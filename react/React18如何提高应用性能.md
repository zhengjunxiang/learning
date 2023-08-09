> 作者：CUGGZ
> 链接：https://juejin.cn/post/7257410745636913207
> 来源：稀土掘金

React 18 引入了并发功能，从根本上改变了 React 应用的渲染方式。本文将探讨 Transitions、Suspense 和 React Server Components 等并发功能如何影响和提高应用的性能。

## 主线程和长任务

当在浏览器中运行 JavaScript 时，JavaScript 引擎在单线程环境中执行代码，该环境通常称为主线程。除了执行 JavaScript 代码之外，主线程还负责处理其他任务，包括管理用户交互（如单击）、处理网络事件、计时器、更新动画以及管理浏览器重排和重绘。

![主线程负责将任务一一处理](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90284c49f73d4a94a2c0442d521a8e34~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "主线程负责将任务一一处理")

当一个任务正在处理时，所有其他任务都必须等待。虽然浏览器可以顺利执行小型任务以提供无缝的用户体验，但较长的任务可能会出现问题，因为它们可能会阻止其他任务的处理。

任何运行时间超过 50 毫秒的任务都被视为“ **长任务** ”。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ade892540094cc695dae2b67b7f6d09~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

50 毫秒基准基于以下条件确认的：设备必须每 16 毫秒 (60 fps) 创建一个新帧才能保持流畅的视觉体验。然而，设备还必须执行其他任务，例如响应用户输入和执行 JavaScript。50ms 基准测试允许设备将资源分配给渲染帧和执行其他任务，并为设备提供约 33.33ms 的额外时间来执行其他任务，同时保持流畅的视觉体验。

## 性能指标

为了保持最佳性能，尽量减少长任务的数量非常重要。为了衡量网站的性能，有两个指标可以衡量长时间任务对应用程序性能的影响：**总阻塞时间**和 **下次绘制的交互** 。

总阻塞时间 (TBT) 是衡量首次内容绘制 (FCP) 和交互时间 (TTI) 之间时间的重要指标。TBT 是执行时间超过 50 毫秒的任务的总和，这会对用户体验产生重大影响。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c6f7eb16e5e4abfb7481b64300f69c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

上图的 TBT 为 45ms，因为有两个任务在 TTI 之前花费了超过 50ms 的时间，分别超出了 50ms 阈值 30ms 和 15ms。总阻塞时间是这些值的累加：30ms + 15ms = 45ms。

下次绘制的交互（INP）是一个新的 Core Web Vitals 指标，用于衡量用户首次与页面进行交互（例如点击按钮）到该交互在屏幕上可见的时间，也就是下次绘制的时间。这个指标对于有很多用户交互的页面特别重要，比如电子商务网站或社交媒体平台。它通过累积用户当前访问期间的所有 INP 测量值，并返回最差的得分来进行衡量。

![到下次绘制的交互时间为 250 毫秒，因为这是测量到的最高视觉延迟。](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6184d4f7e0f445da0c39347d068ca8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "到下次绘制的交互时间为 250 毫秒，因为这是测量到的最高视觉延迟。")

要了解新的 React 更新如何针对这些测量进行优化从而改善用户体验，首先要了解传统 React 的工作原理。

## 传统的 React 渲染

React 中的视觉更新分为两个阶段：**渲染阶段**和 **提交阶段** 。React 中的渲染阶段是一个纯粹的计算阶段，其中 React 元素与现有 DOM 进行协调（即比较）。此阶段涉及创建新的 React 元素树，也称为“虚拟 DOM”，它本质上是实际 DOM 的轻量级内存中表示。

在渲染阶段，React 计算当前 DOM 和新 React 组件树之间的差异并准备必要的更新。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4592ce0eefc465791a414fe378aef50~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

渲染阶段之后是提交阶段。在此阶段，React 将渲染阶段计算出的更新应用于实际 DOM。这涉及创建、更新和删除 DOM 节点以镜像新的 React 组件树。

在传统的同步渲染中，React 会给组件树中的所有元素赋予相同的优先级。当渲染组件树时，无论是在初始渲染还是在状态更新时，React 都会继续并在单个不间断任务中渲染该树，然后将其提交给 DOM 以直观地更新屏幕上的组件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2a3d2a2f49d40a4b05c5a987a4c8513~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

同步渲染是一种“全有或全无”的操作，它保证开始渲染的组件总是会完成。根据组件的复杂性，渲染阶段可能需要一段时间才能完成。主线程在此期间被阻塞，这意味着尝试与应用交互的用户会遇到无响应的 UI，直到 React 完成渲染并将结果提交到 DOM。

下面来看一个例子，有一个文本输入字段和一个很长的城市列表，根据文本输入的当前值进行过滤。在同步渲染中，React 将在每次按键时重新渲染 `CitiesList`组件。这是一个相当昂贵的计算，因为该列表由数万个城市组成，所以在按键和在文本输入中看到反映的之间存在明显的视觉反馈延迟。

```js
// APP.js
import React, { useState } from "react";
import CityList from "./CityList";

export default function SearchCities() {
  const [text, setText] = useState("Am");

   return (  
      <main>  
          <h1>Traditional Rendering</h1>  
          <input type="text" onChange={(e) => setText(e.target.value) }   />  
          <CityList searchQuery={text} />  
      </main>  
     );
};

// CityList.js
import cities from "cities-list";
import React, { useEffect, useState } from "react";
const citiesList = Object.keys(cities);

const CityList = React.memo(({ searchQuery }) => {
  const [filteredCities, setCities] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    setCities(() =>
      citiesList.filter((x) =>
         x.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
   }, [searchQuery]);

  return (
     <ul>
       {filteredCities.map((city) => (
         <li key={city}>
           {city}
        </li>
       ))}
    </ul>
    )
});

export default CityList;

// index.js
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

ReactDOM.render(<StrictMode><App /></StrictMode>,  rootElement);

```

效果如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d36c5a01824cceb0bb92a99c043acd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

 **在线体验：** [codesandbox.io/s/w4zcct](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fw4zcct "https://codesandbox.io/s/w4zcct")

> 注意：如果使用的是高端设备，比如 Macbook，可以将 CPU 限制为慢 4 倍的速度，以模拟低端设备。可以在 Devtools > Performance > ⚙️ > CPU中找到此设置，如图所示：
>
> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9aa33c64ae4b6494b36ede9892d8f2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当查看 Performance 选项卡时，可以看到每次点击都会发生很长的任务：

![标有红角的任务被视为“长任务”，注意总阻塞时间为 4425.40ms。](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57de099603ac424ea7b1d5e126536b9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "标有红角的任务被视为“长任务”，注意总阻塞时间为 4425.40ms。")

在这种情况下，React 开发者通常会使用像"debounce"这样的方法来延迟渲染，但没有内置的解决方案。

React 18 引入了一个在幕后运行的新的并发渲染器。该渲染器提供了一些将某些渲染标记为非紧急的方法。

![当渲染低优先级组件（粉色）时，React 返回主线程以检查更重要的任务](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfc12164a4d243d18c6fcc1e9212a0de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "当渲染低优先级组件（粉色）时，React 返回主线程以检查更重要的任务")

在这种情况下，React 将每 5 毫秒返回主线程，看看是否有更重要的任务需要处理，例如用户输入，甚至渲染另一个对当时的用户体验更重要的 React 组件。通过不断返回主线程，React 能够使此类渲染成为非阻塞并优先处理更重要的任务。

![并发渲染器不是为每个渲染执行一个不可中断的任务，而是在低优先级组件的（重新）渲染期间以 5 毫秒的间隔将控制权交还给主线程。](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db5ceef258b74c14b8dc1da9e261417f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "并发渲染器不是为每个渲染执行一个不可中断的任务，而是在低优先级组件的（重新）渲染期间以 5 毫秒的间隔将控制权交还给主线程。")

此外，并发渲染器能够在后台“同时”渲染组件树的多个版本，而无需立即提交结果。

同步渲染是一种全有或全无的计算，而并发渲染器允许 React 暂停和恢复一个或多个组件树的渲染，以实现最佳的用户体验。

![React 根据用户交互暂停当前渲染，迫使其优先渲染另一个更新](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e76a1ea2232b462781674eddd277a0d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "React 根据用户交互暂停当前渲染，迫使其优先渲染另一个更新")

使用并发功能，React 可以根据外部事件（例如用户交互）暂停和恢复组件的渲染。当用户开始与 `ComponentTwo` 交互时，React 暂停当前的渲染，优先渲染 `ComponentTwo`，然后恢复渲染 `ComponentOne`。

## Transitions

可以使用 `useTransition`钩子提供的 `startTransition`函数将更新标记为非紧急。这是一个强大的新功能，允许将某些状态更新标记为“过渡”，表示它们可能导致视觉变化，如果同步渲染可能会对用户体验造成干扰。

通过将状态更新包装在 `startTransition`中，就告诉 React 可以延迟或中断渲染，以优先处理更重要的任务，以保持当前的用户界面具有交互性。

```js
import { useTransition } from "react";

function Button() {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => {
        urgentUpdate();
        startTransition(() => {
          nonUrgentUpdate()
        })
      }}
    >...</button>
  )
}

```

当过渡开始时，并发渲染器在后台准备新树。一旦完成渲染，它会将结果保留在内存中，直到 React 调度程序可以高效地更新 DOM 以反映新状态。这一刻可能是当浏览器空闲并且更高优先级的任务（例如用户交互）没有待处理时。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565cf8b762e047eda3257690c7ee4bfa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

对于上面的 `CitiesList` 例子来说，使用过渡效果将是完美的。可以将每个按键上直接调用 `setCities` 的操作改为在 `startTransition`中进行包装。这告诉 React 状态更新可能会导致对用户造成干扰的视觉变化，因此 React 应该尝试在后台准备新的状态时保持当前界面的交互性，而不立即提交更新。

```js
// CitiesList.js
import cities from "cities-list";
import React, { useEffect, useState, useTransition } from "react";
const citiesList = Object.keys(cities);

const CityList = React.memo(({ searchQuery }) => {
  const [filteredCities, setCities] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchQuery) return;

    startTransition(() => {
      setCities(() =>
        citiesList.filter((x) =>
           x.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    });
   }, [searchQuery]);

  return (
     <ul>
       {filteredCities.map((city) => (
         <li key={city} style={isPending ? { opacity: 0.2 } : null}>
           {city}
        </li>
       ))}
    </ul>
    )
});

export default CityList;

```

 **在线体验：** [codesandbox.io/s/rgqrky](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Frgqrky "https://codesandbox.io/s/rgqrky")

现在在输入框中输入时，用户输入保持平滑，没有按键之间的视觉延迟。这是因为文本状态仍然同步更新，输入框使用它作为其值。然而，`CitiesList`组件将其状态更新包装在 `startTransition`中。

在后台，React 开始在每次击键时渲染新树。但这并不是一个全有或全无的同步任务，React 开始在内存中准备组件树的新版本，同时当前 UI（显示“旧”状态）仍然响应进一步的用户输入。

查看 Performance 选项卡，相较于未使用过渡的实现的性能图表，将状态更新包装在 `startTransition`中显著降低了长任务的数量和总阻塞时间。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75632897f8874b2890370e011a66223c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

过渡是React渲染模型中的一个重要变革，使React能够同时渲染多个版本的UI，并管理不同任务之间的优先级。这可以提供更流畅、响应更灵敏的用户体验，特别是在处理高频更新或 CPU 密集型渲染任务时。

## React Server Components

React Server Components 是 React 18 中的一项 **实验性功能** ，但[已准备好供框架采用](https://link.juejin.cn?target=https%3A%2F%2Freact.dev%2Fblog%2F2023%2F05%2F03%2Freact-canaries "https://react.dev/blog/2023/05/03/react-canaries")。

传统上，React 提供了几种主要的方式来渲染应用。可以完全在客户端上渲染所有内容（客户端渲染），也可以在服务端将组件树渲染为 HTML，并将此静态 HTML 与 JavaScript 包一起发送到客户端，然后在客户端进行组件的水合（服务端渲染）。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cc3254b0b1446218c3fbdb276f3e1d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

这两种方法都依赖于这样一个事实：同步 React 渲染器需要使用附带的 JavaScript 包在客户端重建组件树，即使该组件树已经在服务端可用。

React Server Components 允许 React 将实际的序列化组件树发送到客户端。客户端 React 渲染器理解这种格式，并使用它来高效地重建 React 组件树，而无需发送 HTML 文件或 JavaScript 包。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2797ff5c2e74667b84954710d38fa07~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以通过结合 `react-dom/server`的 `renderToPipeableStream`方法和 `react-dom/client`的 `createRoot`方法来使用这种新的渲染模式。

```js
// server/index.js
import App from '../src/App.js'
app.get('/rsc', async function(req, res) {  
  const {pipe} = renderToPipeableStream(React.createElement(App));
  return pipe(res);
});

// src/index.js
import { createRoot } from 'react-dom/client';
import { createFromFetch } from 'react-server-dom-webpack/client';
export function Index() {
  ...
  return createFromFetch(fetch('/rsc'));
}
const root = createRoot(document.getElementById('root'));
root.render(<Index />);

```

 **在线体验** ：[codesandbox.io/p/sandbox/c…](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fsandbox%2Fcocky-minsky-m7sgfx "https://codesandbox.io/p/sandbox/cocky-minsky-m7sgfx")

默认情况下，React不会对React Server Components进行水合。这些组件不应该使用任何客户端交互，例如访问 `window`对象或使用像 `useState`或 `useEffect`这样的hook。

要将组件及其导入添加到 JavaScript 包中，并发送到客户端使其具备交互功能，可以在文件顶部使用 `use client` 指令。这告诉打包工具将该组件及其导入添加到客户端包，并告知 React 在客户端进行水合以添加交互性，这种组件称为客户端组件。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df66c7d7c31044cd98749d1cb87b34ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 注意：框架实现可能有所不同。例如，Next.js 将在服务端将客户端组件预渲染为 HTML，类似于传统的 SSR 方法。然而，默认情况下，客户端组件的渲染方式与 CSR 方法类似。

在使用客户端组件时，开发人员需要优化构建包的大小。可以使用以下方式：

* 确保只有交互组件的最末端节点定义了 `use client`** **指令，这可能需要对组件进行解耦。
* 将组件树作为 `props` 传递，而不是直接导入它们。这允许 React 将 `children` 渲染为 React 服务端组件，而无需将它们添加到客户端包中。

## Suspense

另一个重要的新并发功能就是 `Suspense`。尽管这并不完全是新的，因为 `Suspense`是在React 16 中发布的，用于与 `React.lazy`进行代码拆分，但 React 18 引入的新功能将Suspense 扩展到了数据获取。

使用 `Suspense` 可以延迟组件的渲染，直到满足某些条件，例如从远程源加载数据。同时，我们可以渲染一个回退组件，指示该组件仍在加载。

通过声明性地定义加载状态，减少了任何条件渲染逻辑的需求。将 `Suspense`与React Server Components 结合使用，可以直接访问服务端的数据源，无需额外的API端点，如数据库或文件系统。

```js
async function BlogPosts() {
  const posts = await db.posts.findAll();
  return '...';
}
 
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <BlogPosts />
    </Suspense>
  )
}

```

使用 React Server Components 与 Suspense 无缝协作，这允许在组件仍在加载时定义加载状态。

Suspense的真正力量来自于它与React的并发功能的深度集成。当组件被挂起时，例如因为它仍在等待数据加载，React 不会只是闲置直到组件收到数据。相反，它会暂停暂停组件的渲染并将其焦点转移到其他任务。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f48fe095a6c4dabaa067514de95d54c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
在此期间，可以告诉 React 渲染一个后备 UI 以指示该组件仍在加载。一旦等待的数据可用，React 就可以以可中断的方式无缝地恢复先前挂起的组件的渲染，就像上面看到的过渡一样。

React 还可以根据用户交互重新调整组件的优先级。例如，当用户与当前未渲染的挂起组件进行交互时，React 会挂起正在进行的渲染并优先考虑用户正在与之交互的组件。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3267aed7ac04b0d8c6363d70542df7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
一旦准备就绪，React 会将其提交到 DOM，并恢复之前的渲染。这确保了用户交互的优先级，并且 UI 保持响应并根据用户输入保持最新状态。

`Suspense`与React Server Component的可流化格式相结合，允许高优先级更新在准备好后立即发送到客户端，而无需等待低优先级渲染任务完成。这使客户端能够更快地开始处理数据，并通过在内容以非阻塞方式到达时逐渐显示内容来提供更流畅的用户体验。

这种可中断的渲染机制与 `Suspense`处理异步操作的能力相结合，提供了更流畅、更以用户为中心的体验，特别是在具有大量数据获取需求的复杂应用中。

## 数据获取

除了渲染更新之外，React 18 还引入了一个新的 API 来有效地获取数据并记住结果。

React 18 有一个 `cache` 函数，可以记住包装函数调用的结果。如果在同一个渲染过程中使用相同的参数调用相同的函数，它将使用记忆的值，而无需再次执行该函数。

```js
import { cache } from 'react'
 
export const getUser = cache(async (id) => {
  const user = await db.user.findUnique({ id })
  return user;
})

getUser(1)
getUser(1) // 在同一渲染过程中调用：返回已存储的结果。

```

在 `fetch`调用中，React 18 现在默认包含类似的缓存机制，而无需使用 `cache`。这有助于减少单个渲染过程中的网络请求数量，从而提高应用性能并降低 API 成本。

```js
export const fetchPost = (id) => {
  const res = await fetch(`https://.../posts/${id}`);
  const data = await res.json();
  return { post: data.post } 
}

fetchPost(1)
fetchPost(1) // 在同一渲染过程中调用：返回已存储的结果。

```

这些功能在使用 React 服务端组件时非常有用，因为它们无法访问 `Context` API。缓存和 fetch 的自动缓存行为允许从全局模块导出单个函数并在整个应用中重用它。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40618ec547e54402a550359248bc944b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```js
async function fetchBlogPost(id) {
  const res = await fetch(`/api/posts/${id}`);
  return res.json();
} 

async function BlogPostLayout() {
  const post = await fetchBlogPost('123');
  return '...'
}
async function BlogPostContent() {
  const post = await fetchBlogPost('123'); // 返回缓存值
  return '...'
}

export default function Page() {
  return (
    <BlogPostLayout>
      <BlogPostContent />
    </BlogPostLayout>
  )
}

```

## 总结

React 18 的最新功能在很多方面提高了应用的性能：

* **并发模式** ：渲染过程可以暂停并稍后恢复，甚至放弃。这意味着即使正在进行大型渲染任务，UI 也可以立即响应用户输入。
* **Transitions API：**允许在数据获取或屏幕更改期间实现更平滑的过渡，而不会阻止用户输入。
* **React Server Components：**支持构建可在服务器和客户端上运行的组件，将客户端应用的交互性与传统服务端渲染的性能相结合，而无需水合成本。
* **扩展 Suspense 功能** ：允许应用的某些部分先于其他可能需要更长时间获取数据的部分进行渲染，从而提高了加载性能。

参考：[vercel.com/blog/how-re…](https://link.juejin.cn/?target=https%3A%2F%2Fvercel.com%2Fblog%2Fhow-react-18-improves-application-performance "https://vercel.com/blog/how-react-18-improves-application-performance")
