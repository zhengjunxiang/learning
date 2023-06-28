> https://juejin.cn/post/7239244337539219514
>
> 作者：2712
> 链接：https://juejin.cn/post/7239244337539219514
> 来源：稀土掘金



在现代的Web应用程序中，异步加载已经成为了一种常见的技术手段。在React中，我们通常使用 `React.lazy()`和 `<Suspense>`组件来实现异步加载。本文将介绍React Suspense的基本概念和用法，并通过示例代码演示如何使用React Suspense来优雅地处理异步加载。


## 什么是React Suspense？

React Suspense是React 16.6版本中引入的一种新特性，它可以让我们更加优雅地处理异步加载。在React Suspense之前，我们通常使用回调函数或Promise来处理异步加载，这种方式虽然可行，但是代码会变得非常复杂和难以维护。React Suspense的出现，使得我们可以使用类似于同步代码的方式来处理异步加载，从而使得代码更加简洁和易于理解。

## React Suspense的基本用法

React Suspense的基本用法非常简单，我们只需要使用 `<Suspense>`组件来包裹需要异步加载的组件，并在 `fallback`属性中指定一个加载中的组件即可。下面是一个简单的示例代码：

```js
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;

```


在上面的代码中，我们使用 `lazy()`函数来异步加载 `./LazyComponent`组件，然后使用 `<Suspense>`组件来包裹 `<LazyComponent>`组件，并在 `fallback`属性中指定一个加载中的组件。当 `./LazyComponent`组件加载完成后，它会被渲染到页面上。

## React Suspense的高级用法

除了基本用法之外，React Suspense还有一些高级用法，可以帮助我们更加灵活地处理异步加载。下面是一些常见的高级用法：

### 1. 多个异步加载

如果我们需要同时加载多个组件，可以使用 `<Suspense>`组件的嵌套来实现。下面是一个示例代码：

```js
import React, { lazy, Suspense } from 'react';

const LazyComponent1 = lazy(() => import('./LazyComponent1'));
const LazyComponent2 = lazy(() => import('./LazyComponent2'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent1 />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent2 />
        </Suspense>
      </Suspense>
    </div>
  );
}

export default App;

```


在上面的代码中，我们使用两个 `<Suspense>`组件来包裹两个异步加载的组件，从而实现了多个异步加载。

### 2. 错误处理

如果异步加载出现错误，我们可以使用 `<ErrorBoundary>`组件来捕获错误并进行处理。下面是一个示例代码：

```js
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function ErrorFallback() {
  return <div>Error!</div>;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;


```

在上面的代码中，我们定义了一个 `<ErrorBoundary>`组件来捕获错误，并在 `render()`方法中根据 `hasError`状态来渲染错误组件或子组件。在 `<Suspense>`组件中使用 `<ErrorBoundary>`组件，可以捕获异步加载出现的错误。


### 3. 预加载

如果我们需要在页面加载完成后立即开始异步加载，可以使用 `<Suspense>`组件的 `onRenderCallback`属性来实现。下面是一个示例代码：

```js
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>} onRenderCallback={() => console.log('Rendered!')}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;

```

在上面的代码中，我们使用 `onRenderCallback`属性来指定一个回调函数，在组件渲染完成后会被调用。在回调函数中，我们可以执行一些预加载的操作，从而提高页面的加载速度。

## 总结

React Suspense是一种非常优雅的处理异步加载的方式，它可以让我们使用类似于同步代码的方式来处理异步加载，从而使得代码更加简洁和易于理解。在实际开发中，我们可以根据需要使用React Suspense的基本用法和高级用法，从而更加灵活地处理异步加载。
