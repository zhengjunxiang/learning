# vite插件

插件是什么？

> vite会在生命周期的不同阶段中去调用不同的插件以达到不同的目的

vite从开始执行到执行结束, 那么着整个过程就是vite的生命周期

webpack: 输出html文件的一个插件 清除输出目录: clean-webpack-plugin

# vite-aliases
vite-aliases可以帮助我们自动生成别名: 检测你当前目录下包括src在内的所有文件夹, 并帮助我们去生成别名
{
    "@": "/**/src",
    "@aseets": "/**/src/assets",
    "@components": "/**/src/components",
}

# 手写vite-alias插件

整个插件就是在vite的生命周期的不同阶段去做不同的事情

比方说vue和react会给你提供一些生命周期函数:
- created
- mounted

生命周期钩子

我们去手写Vite-aliases其实就是抢在vite执行配置文件之前去改写配置文件

通过vite.config.js 返回出去的配置对象以及我们在插件的config生命周期中返回的对象都不是最终的一个配置对象

vite会把这几个配置对象进行一个merge合并

{...defaultConfig, ...specifyConfig}

// 其他生命周期
- config
- configureSever
- transformIndexHtml