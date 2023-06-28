# vite环境变量配置

> 环境变量: 会根据当前的代码环境产生值的变化的变量就叫做环境变量

代码环境:
1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境

我们在和后端同学对接的时候, 前端在开发环境中请求的后端API地址和生产环境的后端API地址是一个吗？ 肯定不是同一个
- 开发和测试: http://test.api/
- 生产: https://api/

在vite中的环境变量处理:

vite内置了dotenv这个第三方库

dotenv会自动读取.env文件, 并解析这个文件中的对应环境变量 并将其注入到process对象下(但是vite考虑到和其他配置的一些冲突问题, 他不会直接注入到process对象下)

涉及到vite.config.js中的一些配置:
- root
- envDir: 用来配置当前环境变量的文件地址

vite给我们提供了一些补偿措施:我们可以调用vite的loadEnv来手动确认env文件

process.cwd方法: 返回当前node进程的工作目录

.env: 所有环境都需要用到的环境变量
.env.development: 开发环境需要用到的环境变量(默认情况下vite将我们的开发环境取名为development)
.env.production: 生产环境需要用到的环境变量(默认情况下vite将我们的生产环境取名为production)

yarn dev --mode development 会将mode设置为development传递进来

当我们调用loadenv的时候, 他会做如下几件事:
1. 直接找到.env文件不解释 并解析其中的环境变量 并放进一个对象里
2. 会将传进来的mode这个变量的值进行拼接: ```.env.development```,  并根据我们提供的目录去取对应的配置文件并进行解析, 并放进一个对象
3. 我们可以理解为
   ```js
    const baseEnvConfig = 读取.env的配置
    const modeEnvConfig = 读取env相关配置
    const lastEnvConfig = { ...baseEnvConfig, ...modeEnvConfig }
   ```

如果是客户端, vite会将对应的环境变量注入到import.meta.env里去

vite做了一个拦截, 他为了防止我们将隐私性的变量直接送进import.meta.env中, 所以他做了一层拦截, 如果你的环境变量不是以VITE开头的, 他就不会帮你注入到客户端中去, 如果我们想要更改这个前缀, 可以去使用envPrefix配置

补充一个小知识: 为什么vite.config.js可以书写成esmodule的形式, 这是因为vite他在读取这个vite.config.js的时候会率先node去解析文件语法, 如果发现你是esmodule规范会直接将你的esmodule规范进行替换变成commonjs规范


