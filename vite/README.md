## 快速生成 vite 项目

当前 vite 的热度和使用率越来越高，Vite 附带了一套 构建优化 的 构建命令，开箱即用。

### 初始化项目
使用 NPM:
```bash
$ npm create vite@latest
```
使用 Yarn:
```bash
$ yarn create vite
```
使用 PNPM:
```bash
$ pnpm create vite
```

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:
#### npm 6.x
npm create vite@latest my-vue-app --template vue

#### npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

#### yarn
yarn create vite my-vue-app --template vue

#### pnpm
pnpm create vite my-vue-app --template vue


### 社区模板
[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 是一个快速生成主流框架基础模板的工具。查看 [Awesome Vite](https://github.com/vitejs/awesome-vite#templates) 仓库的 社区维护模板，里面包含各种工具和不同框架的模板。你可以用如 [degit](https://github.com/Rich-Harris/degit) 之类的工具，使用社区模版来搭建项目。

```bash
npx degit user/project my-project
cd my-project
npm install
npm run dev
```
如果该项目使用 main 作为默认分支, 需要在项目名后添加 #main。

```bash
npx degit user/project#main my-project
```

当前 create-vite 只提供了 vanilla，vanilla-ts, vue, vue-ts，react，react-ts，react-swc，react-swc-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts 模板；
但这一在 [Awesome Vite](https://github.com/vitejs/awesome-vite#templates) 社区中查看更多的模板，一下是获取社区中的 [vite-react-ts](https://github.com/uchihamalolan/vite-react-ts) 项目的示例
```bash
npx degit https://github.com/uchihamalolan/vite-react-ts.git\#main my-react-app
```

[Awesome Vite](https://github.com/vitejs/awesome-vite#templates) 社区提供了很多非常优秀的 vite 模板，基本可以满足我们开放项目的各种需求，由此可见 vite 的生态的繁荣；
