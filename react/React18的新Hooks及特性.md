> https://juejin.cn/post/7240017532715270201
>
> 作者：1in
> 链接：https://juejin.cn/post/7240017532715270201

React18全面实现Concurrent Mode（并发模式），在本文中，我会简单介绍一下React18有哪一些新的特性。

## 批量更新

关于批量更新的特性，在React18以前，React就实现了这样的特性，只不过在React18中，将这一特性扩大了。

#### 为什么要实现批量更新

```javascript
function App(){
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);
    function handleClick() {
        setCount((c) => c + 1);

        setFlag((f) => !f);

    }
    return (
        <div>
            <div>{count}</div>
            <button onClick={handleClick}>Next</button>
        </div> );
    }

```

在以上的代码中，如果我点击了button元素，按理说每一次的setState都会执行一次re-render，但是我们完全可以把这两次setState合并成一次，从而减少重复re-render带来的不必要的性能损耗。

#### 支持批处理操作扩大

在React18中，批处理支持的范围扩大了，Promise，setTimeout，native event handlers等这些非React原生事件的更新也会触发批处理操作。

也就是说，在React18中，setTimeout不会帮助setState逃离React的 `异步`掌控了。

但是在React18中，React提供了新的函数 `flushSync`这个函数，可以使setState触发更新时直接更新，不用等到批处理操作

```javascript
import { flushSync } from "react-dom";
function handleClick() {
    flushSync(() => { setCounter((c) => c + 1); });
    flushSync(() => { setFlag((f) => !f); });
}

```

以上两个函数就不会执行批处理操作，而是setState是直接执行。但是React官方不推荐我们这么做，除非不得已的时候，毕竟这样做是会损耗性能的。

## Transitions

Transitions 是 React 中一个用于区分高优更新和非高优更新的新概念。

### 高优更新与非高优更新的概念

* `starTransition`：用于标记非紧急的更新，用 `starTransition` 包裹起来就是告诉 React，这部分代码渲染的优先级不高，可以优先处理其它更重要的渲染。用法如下：

```javascript
import { startTransition } from "react";
    setCount(input);
    startTransition(() => {
        setFlag(false);
    });

```

* useTransition：除了能提供 startTransition 以外，还能提供一个变量来跟踪当前渲染的执行状态：

```javascript
import { useTransition } from "react";

const [isPending, startTransition] = useTransition();

return isPending && <Spinner />;

```

## Suspense

Suspense 是 React 提供的用于声明 UI 加载状态的 API：

```javascript
<Suspense fallback={<Loading />}>
    <ComponentThatSuspends />
    <Sibling />
</Suspense>

```

上面这串代码里，组件 `ComponentThatSuspends` 在请求处理数据过程中，React 会在它的位置上展示 Loading 组件。

React 16 和 17 中也已经有 Suspense 了，但是它不是完全体，有许多功能仍未就绪。在 React 团队的计划中，Suspense 的完全体是基于 Concurrent React 的，所以在 React 18，Suspense 相较之前有了一些变化。

### Suspense for SSR

React 18 之前的 SSR， 客户端必须一次性的等待 HTML 数据加载到服务器上并且等待所有 JavaScript 加载完毕之后再开始 hydration， 等待所有组件 hydration 后，才能进行交互。即整个过程需要完成从获取数据（服务器）→ 渲染到 HTML（服务器）→ 加载代码（客户端）→ 水合物（客户端）这一套流程。这样的 SSR 并不能使我们的完全可交互变快，只是提高了用户的感知静态页面内容的速度。

React 18 的 Suspense：

* 服务器不需要等待被 Suspense 包裹组件是否加载到完毕，即可发送 HTML，而代替 Suspense 包裹的组件是 fallback 中的内容，一般是一个占位符（spinner），以最小内联 `<script>` 标签标记此 HTML 的位置。等待服务器上组件的数据准备好后，React 再将剩余的 HTML 发送到同一个流中。
* hydration 的过程是逐步的，不需要等待所有的 js 加载完毕再开始 hydration，避免了页面的卡顿。
* React 会提前监听页面上交互事件（如鼠标的点击），对发生交互的区域优先进行 hydration。

## useDeferredValue

* startTransition 可以用来标记低优先的 state 更新；而 useDeferredValue 可以用来标记低优先的变量。
* 下方代码的具体效果是当 input 的值改变时，返回的 value 并不会立即改变，会首先返回上一次的 input 值，如果当前不存在更紧急的更新，才会变成最新的 input，因此可以通过 value 是否改变来进行一些低优先级的更新。可以在渲染比较耗时的情况下把优先级滞后，在多数情况不会存在不必要的延迟。在较快的机器上，滞后会更少或者根本不存在，在较慢的机器上，会变得更明显。但不论哪种情况，应用都会保持可响应。

```javascript
import { useDeferredValue } from "react";
const Comp = (input) => {
    const value = useDeferredValue(input);
};

```

## 不常用的Hooks

以下的新 hook 主要用于解决 SSR 相关的问题或者是为第三方库的开发设计的，对于普通 React 应用开发者来说几乎用不到：

* useId 用于解决 SSR 时客户端与服务端难以生成统一的 ID 的问题
* useSyncExternalStore 是一个为第三方库编写提供的新 hook，主要用于支持 React 18 在 concurrent rendering 下与第三方 store 的数据同步问题。
* useInsertionEffect 主要用于提高第三方 CSS in JS 库渲染过程中样式注入的性能。
