> 作者：19组清风
> 链接：https://juejin.cn/post/7051355444341637128
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 写在前边

无论是日常业务架构、前端框架设计甚至在前端面试过程中，一定会存在 Babel 的身影。

谈起 Babel 大多数前端开发者望而却步，很多开发者对于 Babel 的了解仅仅是知其然而不知其所以然。

网络上有很多博客关于 Babel 的配置用法众说纷纭，对于 Babel 在不同的业务场景下究竟应该如何配置才是最佳实践方式你很难找到答案，甚至官网也仅仅只是罗列出来一些配置的简单说明而已。

这也就是我写这篇文章的初衷，我会和大家来聊聊我是如何利用 Babel 在不同的前端项目寻找最佳实践配置，从此让你对于 Babel 配置得心应手。

# 开始之前

文中并不会涉及太多 Babel 基础知识和插件开发以及原理方面的知识。

这篇文章我重点想和大家结合业务来聊聊如何选择最合适的 Babel 配置方案来辅助你的业务构架，如果你有兴趣了解更深层次了解 Babel 可以查看这两篇文章。

* [「前端基建」带你在Babel的世界中畅游](https://juejin.cn/post/7025237833543581732 "https://juejin.cn/post/7025237833543581732")

这是一篇 Babel 从入门到原理方面的文章，如果有兴趣全面了解 Babel 配置的同学可以翻阅这篇文章。

文中会为你讲述 Babel 在日常前端基础建设中的配置指南，之后会过渡到简单编译原理知识的讲解从而手把手带你开发一些简单的 Babel 插件。

* [从 Tree Shaking 来走进Babel插件开发者的世界](https://juejin.cn/post/7028584587227824158 "https://juejin.cn/post/7028584587227824158")

这篇文章会带你实现一款稍微复杂的 Babel 插件，如果你有兴趣深层次了解 Babel 插件开发你可以查阅它。

# 背景

首先，在大多数前端项目中我们使用 Babel 更多的是充当所谓**转译**的作用。

在项目打包过程中借助一些提供的插件，比如 webpack 中的 babel-loader 、rollup 中的 @rollup/plugin-babel 等等。

**我们通过一系列插件在打包过程中通过 Babel 将我们高版本 ECMAScrpit 转换成为兼容性更加良好的低版本语法，从而提供给生产环境使用。**

目前，决大多数前端项目中这是 Babel 承载的最主要的内容之一。接来下让我们顺着这个方向来聊聊究竟应该如何寻找符合业务场景下的最佳配置。

> 文章中的配置我会使用 [ rollup ](https://link.juejin.cn?target=https%3A%2F%2Frollupjs.org%2Fguide%2Fen%2F%23overview "https://rollupjs.org/guide/en/#overview") 来为大家演示，这是因为相对于其他打包工具 rollup 对于 js 文件打包的结果更加干净和直观。

> 如果你有兴趣了解 Webpack 与 babel 你可以查阅[「前端基建」带你在Babel的世界中畅游](https://juejin.cn/post/7025237833543581732 "https://juejin.cn/post/7025237833543581732")，这篇文章中更多是利用 webpack 来讲解 Babel ，不过任何打包工具本质上仅仅是辅助我们理解 Babel 而已。

# Babel-preset-env

所谓 preset 即是表示一种预设，简单来说很多个 Babel 插件组合到了一起就被称为 Babel-preset 。

babel-preset-env 即是一种预设，它内部包含了一系列 babel-plugin 。

**这个预设的主要就是它允许我们在项目中使用最新的 JavaScript 语法，而无需考虑目标浏览器兼容性。**

preset-env 的内部会内置一系列 plugin，比如一些 `@babel/plugin-transform-arrow-functions`、` @babel/plugin-transform-block-scoping` 等等。

> preset-env 中仅会包含不低于 Stage 3 的 JavaScript 语法提案。

如果一些比较新的 JavaScript 语法，preset-env 内部并不会内置这些插件，此时需要你自己手动在 Babel 配置中引入相应的 Plugin 进行支持。

## 未配置 Babel-preset-env

首先，我在本地快速生成了一份 Rollup 配置项目。此时我并没有配置任何 Babel 相关插件，当我运行打包命令打包如下文件时：

```
const arrowFunction = () => {
  console.log('Hello My name is 19Qingfeng');
};

arrowFunction();
```

打包输出结果：(function () {

```js
  'use strict';

  const arrowFunction = () => {
    console.log('Hello My name is 19Qingfeng');
  };

  arrowFunction();
})();
```


我们可以清楚的看到，代码中的箭头函数并没有被转译。如果用户使用不支持箭头函数的低版本浏览器打开我们的页面，此时项目中的箭头函数一定是会发生错误的。

babel-preset-env 简单来说它的作用正是将一些高版本 **JS 语法**转译称为兼容性良好的 JavaScript 代码。

接下来我会在 rollup 中加入 babel 的配置，我们重新再来看一看：

```js
// rollup.config.js
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import path from 'path';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'esm',
  },
  plugins: [
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, './babel.config.js'),
    }),
  ],
};

// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
};

```

重新再来看看打包结果：

```js
var arrowFunction = function arrowFunction() {
  console.log('Hello My name is 19Qingfeng');
};

arrowFunction();

```


此时可以看到打包出的 arrowFunction 经过 preset-env 的处理，打包后的箭头函数已经被转化成为了普通函数来处理了。

**这就是 preset-env 的作用，转译我们的高版本 JavaScript 语法成为低版本浏览器可支持的语法。**

当然 preset-env 的处理同样是基于[ targets 配置](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-env%23targets "https://babeljs.io/docs/en/babel-preset-env#targets")来处理，简单来说它会根据你配置需要兼容的浏览器来判断是否需要转译语法。

关于 preset-env 转译语法这些基础配置概念我就不过多累赘了，感兴趣的朋友可以自行[移步官网](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-env "https://babeljs.io/docs/en/babel-preset-env")或者查看这篇[「前端基建」带你在Babel的世界中畅游](https://juejin.cn/post/7025237833543581732 "https://juejin.cn/post/7025237833543581732")。

# Polyfill 最佳实践

## 背景

本来这篇文章中是不太想提前关于 polyfill 的基础知识的，因为在之前我已经详细介绍过了一些基础知识和用法。

这里为了照顾一些基础不是很好的同学，我会稍微介绍一下什么是 polyfill ，为什么需要 polyfill。

首先我们来理清楚这三个概念:

* 最新 `ES`语法，比如：箭头函数，`let/const`。
* 最新 `ES Api`，比如 `Promise`
* 最新 `ES`实例/静态方法，比如 `String.prototype.include`

babel-prest-env 仅仅只会转化最新的 es 语法，并不会转化对应的 API 和实例方法,比如说 ES6 中的 Array.from 静态方法。babel 是不会转译这个方法的，如果想在低版本浏览器中识别并且运行 Array.from 方法达到我们的预期就需要额外引入 polyfill 进行在 Array 上添加实现这个方法。

简单来说所谓 polyfill 就是一种垫片，比如一些新的 ES API 一些旧的浏览器并没有对应的实现规则。

此时单纯的使用语法层面的转化是无法实现对应的功能的，需要通过 polyfill 自行实现对应的功能。

比如我在代码里使用了 Array.prototype.include 方法:

```js
// 源代码
const arr = [1];

const result = arr.includes(2);

console.log(result, 'result');

// 编译后的代码
var arr = [1];
var result = arr.includes(2);
console.log(result, 'result');

```


可以清楚的看到，所谓 ES 语法比如 const lest 都已经被成功转译，但是对于 Array.prototype.includes 可以看到并没有被实现。

如果要实现低版本浏览器下这些新的 ES APi 或者静态/实例方法的话，就需要使用 polyfill 来处理了。

## preset-env

业内通常实现 polyfill 有两种方式，第一种是使用 preset-env 的 useBuiltIns 参数，它存在三种配置。

### false

useBuiltIns 默认值为 false ，也就是说不进行任何 polyfill 的转译。

就和我们在刚才 Demo 中演示的那样，仅仅转译 JavasScript 语法而不处理对应的 API。

通常，如果我们不需要 babel-preset-env 为我们的代码增加 polyfill 的时候，可以配置为 false 关闭 preset-env 的 polyfil 。

### entry

useBuiltIns 第二个值为 entry ，它表示在入口处引入 polyfill 进行处理。

#### 从一个例子出发

举一个简单的例子来说:

```js
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'esm',
    strict: false,
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: '> 0.5%, ie >= 11',
            },
            useBuiltIns: 'entry',
            corejs: 3,
          },
        ],
      ],
    }),
  ],
};

// 项目入口文件
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const arr = [1];

// 使用了 Array.protototype.includes 方法
const result = arr.includes(2);

console.log(result, 'result');

```



这里有一些配置问题需要和大家额外强调下：

* @rollup/plugin-node-resolve 默认情况下 rollup 打包并不会将第三方依赖打包进入我们的源代码中。需要使用这个插件将我们编写的源码与依赖的第三方库进行合并输出。
* rollup-plugin-commonjs rollup. 编译源码中的模块引用默认只支持 ESM 模块方式。然而存在一些第三方依赖的 npm 模块是基于 CommonJS 模块方式书写的，这就导致了大量 npm 模块不能直接编译使用。此时这个插件的作用即是让 rollup 同时支持对于 CJS 模块的转译。

关于 Babel 配置，这里主要有两点和大家强调一下：

* 首先，我们使用 `useBuiltIns: 'entry'` 配置。

它表示我们告诉 Babel 我们需要使用 polyfill ，使用polyfill 的方式是在入口文件中引入 polyfill 。

* 其次关于 corejs: 3，我们使用了最新的 3 版本。

corejs 版本2目前已经不被维护了，关于 corejs 的作用你可以将它理解称为上边我们讲到的 polyfill 中关于 ES API 以及内置模块的核心实现内容。

换句话说，corejs 内部帮我们实现了一系列低版本浏览器不支持的 API 内置模块等方法。

* 项目入口文件中

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';

```


当使用 `useBuiltIns: 'entry'` 时需要额外在项目的入口文件引入这两个包。

> 在 `babel@7.4` 版本之前使用 entry 配置时需要在入口引入 `@babel/polyfill`，在7.4 版本之后 `@babel/polyfill`被废弃了，更换为我们上边提到的两个包。

此时我们来看看打包结果:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b86fca820f234133ac48a3c18c0e8934~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里我仅仅截图出了部分的打包结果，可以看到输出的打包结果其实有10000多行代码。

**这是因为当我们使用 useage:entry 配置时，babel 会根据配置的 targets 浏览器兼容性列表来决定。从而将目标浏览器下不支持的内容在项目入口处进行全量引入，分别挂载在对应全局对象上从而达到 polyfill 的作用。**

#### 稍微总结一下吧

上边我们讲述了关于使用 polyfill 的第一种方式：使用 preset-env 的 useBuiltIns: 'entry' 。

这种方式需要两个步骤的配置：

* 首先在 preset-env 中配置 useBuiltIns: 'entry' 。
* 其次需要在项目的入口文件中引入相应的包。

如此之后，Babel 就会根据我们配置需要支持的浏览器列表，将目标浏览器中不支持的 polyfill 进行全量引入并且实现。

**关于 entry 其实了解 Babel 的大多数开发者可能会觉得这种方式没有什么作用，但是其实并不是这样的。**

稍后我会为你对比它的 preset-env 的 usage 对比来讲它的应用场景。

> 当然你也可以直接在入口文件引入对应的 polyfill 的包而不使用 useage:entry 配置，但是这样的话 Babel 会丢失目标浏览器的判断。

### usage

在明白了 entry 的含义之后，我们来看看 useBuiltIns 的另一种方法：usage。

#### 同样从一个例子出发

针对于 useBuiltIns:entry 配置的方式，存在一个比较致命的问题：

**使用 entry 的方式，假使我们代码中仅使用到了 Array.prototype.includes 方法但是它会将目标浏览器中所有不兼容的 polyfill 全部实现并且引入进项目，造成包体积过大。**

针对这种情况，Babel-Preset-Env useBuiltIns 提供了另一种配置方式:usage。

**所谓 usage 即是表示它会分析我们的源代码，判断如果目标浏览器不支持并且我们代码中使用到的情况下才会在模块内进行引入对应的 polyfil。**

让我们修改一下上边的 Demo 重新看看：

```js
// rollup.config.js
// ...

export default {
  // ...
  plugins: [
    commonjs(),
    resolve(),
    babel({
      // exclude: ['node_modules/core-js/**', '/core-js/'],
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: '> 0.5%, ie >= 11',
            },
            // 修改entry为usage
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
    }),
  ],
};

// ./src/main.js
// 不需要在入口文件引入这两个库了
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const arr = [1];

const result = arr.includes(2);

console.log(result, 'result');

```


此时重新运行打包命令来验证下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/842760e269444f23898c6b051e67fa46~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

此时可以看到，打包出来的代码仅仅剩下 4K 多行。这即是因为我们仅仅使用了 Array.prototype.includes 。

使用 usage 时，代码中仅仅会引入使用到的 Array.prototype.includes 对应的 polyfill 内容。

#### usage 简单总结

我们可以看到配合 Preset-Env 的 usage 参数，Babel 会智能的分析源代码中使用到的内容。

**它仅仅会为我们引入目标浏览器中不支持并且我们在代码中使用到的内容，会剔除没有使用到的 polyfill 内容。**

针对于一些虽然目标浏览器不支持的内容，比如 Promise 但是这里我们代码中并没有使用，它即不会将相应的 polyfill 内容打包到最终结果中。

相对于 entry 选项，usage 看起来更加智能化也更加的轻量。

## Preset-env 两种方式最佳实践

### 对比两种方式

上边我们讲到了实现 babel-polyfill 的话可以使用 Preset-Env 的 useBuiltIns 参数。

大多数文章都会告诉你 entry 这种方式一无是处，直接使用 usage 就好了。但实际并不是这样的。

首先 usage 的确更加轻量和智能化，但是假如这样的业务场景下：

通常，我们在使用 Babel 时会将 Babel 编译排除 node_modules 目录（第三方模板）。

此时如果使用 usage 参数，如果我们依赖的一些第三方包中使用到了一些比较新的 ES 内置模块，比如它使用了Promise。

但此时我们的代码中并没有使用 Promise ，如果使用 usage 参数那么问题就来了。

**代码中没有使用 Promise 自然 Promise 的 polyfill 并不会编译到最终的输出目录中，而第三种模块依赖了 Promise 但此时没有 Polyfill 浏览器并不认识这个东西。**

也许你会强调，那么我使用 babel 编译我的第三方模块呢，又或者我在入口处额外单独引入 Promise 的 polyfill 总可以吧。

首先，在入口文件中单独引入 Promise 是假设在已知前提下既是说我了解第三方库代码中使用 Promise 而我的代码中没有 Promise 我需要 polyfil。

这样的情况在多人合作的大型项目下只能说一种理想情况。

其次使用 Babel 编译第三方模块我个人是强烈不推荐的，抛开编译慢而且可能会造成重复编译造成体积过大的问题。

**这种情况下，使用 entry 配置它不香吗？**

**usage 相比 entry 固然更加轻量和智能，但是针对于业务场景下如果对于包体积没有强烈的要求下，我更加推荐你使用 entry 配合在入口处引入项目中所需 polyfill 因为这会避免很多第三方模块没有对应 polyfill 的造成的奇怪问题。**

### 两种方式存在的缺点

同时，上文我们讲到的所有都是针对于日常业务场景下的实践。

首先，在使用 useBuiltIns 配置开启 polyfil 之后的编译代码中，存在这样一段代码：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ae48ba0aa4d432c9d2452d91de43655~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这个函数本质上做的内容你可以将它简单理解成为:

```js
Object.defineProperty(Array.prototype,'includes', {
    value: // ...polyfill 实现的函数
})

```


**无论是 entry 还是 usage 本质上都是通过注入浏览器不支持的 polyfill 在对应的全局对象上增加功能实现，这样无疑是会污染全局环境。**

假如此时你在开发一款类库，使用 useBuiltIns 在库的编译上实现 polyfill ，当你开发完毕提交 Github 看似大功告成时。

此时一位印度小哥使用了你的库，但小哥在自己的代码中重新定义了 Array.prototype.includes 方法的实现，额外填充了一些逻辑。

OK，小哥安装你开发的库。运行代码，不出意外代码报错了。因为你库中的 Array.prototype.includes polyfill 实现污染了全局，影响了印度小哥自己定义的代码。

此时，印度小哥熟练的打开 Github 在你库 issue 上用它蹩脚的英语慰问你全家....

此时，在开发类库时我们迫切的需要一种并不会污染全局的 polyfill ，@babel/runtime 的出现拯救了我于水深火热之中。

## @babel/runtime

简单来说 @babel/runtime 提供了一种不污染全局作用域的 polyfill 的方式，但是不不够智能需要我们自己在代码中手动引入相关 polyfill 对应的包。

同时 @babel/runtime 在转译会在每个模块中各自实现一遍一些 _extend()， classCallCheck() 之类的辅助工具函数，当我们项目中的模块比较多时每个项目中都实现一次这些方法，这无疑是一种噩梦。

> 关于 @babel/runtime 在每个模块工具函数重复的问题，这篇文章中有详细介绍 [前端基建」带你在Babel的世界中畅游](https://juejin.cn/post/7025237833543581732#heading-12 "https://juejin.cn/post/7025237833543581732#heading-12")。

**@babel/plugin-transform-runtime 这个插件正式基于 @babel/runtime 可以更加智能化的分析我们的代码，同时 @babel/plugin-transform-runtime 支持一个 helper 参数默认为 true 它会提取 @babel/runtime 编译过程中一些重复的工具函数变成外部模块引入的方式。**

> 关于 @babel/runtime 和 @babel/plugin-transform-runtime 更加详细联系和演示，你可以查阅[这篇文章](https://juejin.cn/post/7025237833543581732#heading-12 "https://juejin.cn/post/7025237833543581732#heading-12")。

这里我们直接来演示下所谓的 @babel/plugin-transform-runtime 的使用方式:

```js
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'esm',
    strict: false,
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            // 其实默认就是false，这里我为了和大家刻意强调不要混在一起使用
            useBuiltIns: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            // polyfill使用的corejs版本
            // 需要注意这里是@babel/runtime-corejs3 和 preset-env 中是不同的 npm 包
            corejs: 3,
            // 切换对于 @babel/runtime 造成重复的 _extend() 之类的工具函数提取
            // 默认为true 表示将这些工具函数抽离成为工具包引入而不必在每个模块中单独定义
            helpers: true,
            // 切换生成器函数是否污染全局 
            // 为true时打包体积会稍微有些大 但生成器函数并不会污染全局作用域
            regenerator: true,
            version: '7.0.0-beta.0',
          },
        ],
      ],
    }),
  ],
};

```


这里我关闭了 preset-env 的 useBuiltIns ，仅仅使用 preset-env 转译 ES 语法。

而对于一些 ES API 和对应的内置模板，使用 @babel/plugin-transform-runtime 配合 @babel/runtime 来提供 polyfill 。

这里我截取了部分打包后的代码：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c078bb4db187410194235cb312da8785~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

同样相对于 @babel/plugin-transform-runtime 配合 @babel/runtime 使用的话，他们会智能的分析我们代码。

仅仅抽离保留我们代码中使用到的新语法提供 polyfill 实现，但是 @babel/runtime 相对于 usage 而言还存在一个更加值得注意的点 **它并不会污染全局作用域** 。

可以看到最终打包后的代码，之前 usage 是使用 `$({target:'Array',proto:true}) ...` 直接在 Array.prototype 上定义对应的 polyfill 实现。

而 @babel/runtime 打包后的结果可以明显的看到我们是借助引入的 `_includesInstanceProperty` 方来调用的。

> 有兴趣的小伙伴可以深入打包后的实现去看一下。

## @babel/runtime 为什么不适合业务项目

说了这么多，那么 transform runtime 真的如我们想象中的那么完美无瑕嘛？

@babel/runtime 配合 @babel/plugin-transform-runtime 的确可以解决 usage 污染全局作用域的问题，使用它来开发类库看起来非常完美。

有些小伙伴可能就会想到，既然它提供和 usage 一样的智能化按需引入同时还不会污染全局作用域。

那么，为什么我不能直接在业务项目中直接使用 @babel/runtime ，这样岂不是更好吗？

答案肯定是否定的，任何事情都存在它的两面性。

**需要额外注意的是 transform runtime 与环境无关，它并不会因为我们的页面的目标浏览器动态调整 polyfill 的内容，而 useBuiltIns 则会根据配置的目标浏览器而决定是否需要引入相应的 polyfill。**

# 探索最佳实践方案

首先，任何配置项目都有它自己存在的意义。笔者个人认为所谓最佳配置实践方案并不是指某一种固定配置，而是说**结合不同的业务场景下寻找最适合的配置落地方案。**

@babel/runtime && @babel/preset-env 这两种其实完全是为不同场景下设计的 polyfill 解决方案，

## 业务

在日常业务开发中，对于全局环境污染的问题往往并不是那么重要。而业务代码最终的承载大部分是浏览器端，所以如果针对不同的目标浏览器支持度从而引入相应的 polyfill 无疑会对我们的代码体积产生非常大的影响，此时选择 preset-env 开启 useBuiltIns 的方式会更好一些。

**所以简单来讲，我个人强烈推荐在日常业务中尽可能使用 @babel/preset-env 的 useBuiltIns 配置配合需要支持的浏览器兼容性来提供 polyfill 。**

同时关于业务项目中究竟应该选择 useBuiltIns 中的 entry 还是 usage ，我在上边已经和大家详细对比过这两种方式。究竟应该如何选择这两种配置方案，在不同的业务场景下希望大家可以根据场景来选择最佳方案。而不是一概的认为 entry 无用无脑使用 usage 。

## 类库

在我们开发类库时往往和浏览器环境无关所以在进行 polyfill 时最主要考虑的应该是不污染全局环境，此时选择 @babel/runtime 无疑更加合适。

**在类库开发中仅仅开启 @babel/preset-env 的语法转化功能配合 @babel/runtime 提供一种不污染全局环境的 polyfill 可能会更加适合你的项目场景。**

## Tips

关于提供 polyfill 的方法， **我强烈建议大家不要同时开启两种polyfill，这两个东西完全是 Babel 提供给不同场景下的不同解决方案** 。

它不仅会造成重复打包的问题还有可能在某些环境下直接造成异常，具体你可以参考这个 [Issue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Fissues%2F10271 "https://github.com/babel/babel/issues/10271")。

**当然，你同样可以在业务项目中配合 @babel/preset-env 的 polyfill 同时使用 @babel/plugin-transform-runtime 的 helper 参数来解决多个模块内重复定义工具函数造成冗余的问题。**

但是切记设置 runtime 的 `corejs:false` 选项，关闭 runtime 提供的 polyfill 的功能，仅保留一种 polyfill 提供方案。

最后，无论是哪一种 polyfill 的方式，我强烈推荐你使用 corejs@3 版本来提供 polyfill。

# 写在结尾

首先感谢每一位看到这里的小伙伴，希望文章的内容可以为大家带来帮助。

如果你对文章中的内容感到疑惑，你可以通过评论区留下你的问题我们共同探讨。

如果有兴趣深入了解 Babel 的同学可以关注我的专栏[工程化Babel从入门到原理](https://juejin.cn/column/7031914136783028237 "https://juejin.cn/column/7031914136783028237")，我会陆续为大家分享更多关于 Babel 的见解。
