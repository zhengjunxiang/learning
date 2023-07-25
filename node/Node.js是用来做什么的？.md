> 作者：今天你吸猫了么
> 链接：https://juejin.cn/post/7112334584607408135
> 来源：稀土掘金

**Node.js**是一个开源的Javascript运行环境和库，用于在客户的浏览器之外执行和运行网络应用。它基于**V8，一个由Chromium项目为谷歌浏览器和Edge等网络浏览器开发的引擎。**

考虑一个用户与一个网络应用程序互动的场景：他只与应用程序的前端互动，但有很多工作是在幕后进行的。

现在，你知道 **在一个网络应用中，有一个前端、一个服务器和一个数据库** 。前端使用**Javascript和[Angular和React JS](https://link.juejin.cn?target=https%3A%2F%2Fwww.imaginarycloud.com%2Fblog%2Fangular-vs-react%2F "https://www.imaginarycloud.com/blog/angular-vs-react/")**等框架开发，而服务器则建立在Java、PHP或Node.js上，而存储数据的后端数据库通常由**[MySQL或MongoDB](https://link.juejin.cn?target=https%3A%2F%2Fwww.imaginarycloud.com%2Fblog%2Fmongodb-vs-mysql%2F "https://www.imaginarycloud.com/blog/mongodb-vs-mysql/") **组成** [。](https://link.juejin.cn?target=https%3A%2F%2Fwww.imaginarycloud.com%2Fblog%2Fmongodb-vs-mysql%2F "https://www.imaginarycloud.com/blog/mongodb-vs-mysql/")**

让我们仔细看看什么是 *Node.js* ，它的用途是什么，以及它如何成为**你的网络开发项目**的可能 **解决方案和支持** 。


## Node.js的用途是什么？

** *[Node.js](https://link.juejin.cn?target=https%3A%2F%2Fnodejs.org%2Fen%2Fabout%2F "https://nodejs.org/en/about/")***用于开发和运行io密集型网络应用程序，如视频流网站、单页应用程序或在线聊天应用程序。它是**数据密集型应用程序的完美环境** ，因为它使用**单线程、异步事件驱动模型**。这就开始触及在JavaScript运行时生态中开发的优势，但让我们更深入地挖掘 **Node.js的用途以及它的应用和功能** 。

## Node.js的特点

以下是**使Node.js成为**软件架构师的**首要选择**的一些 **关键特征** 。

* **生产力。如**前所述，由于Node.js是基于JS的，我们可以 **在前端和后端都使用相同的语言** 。这就提高了应用程序构建的 **生产力** 。
* **快速的代码执行。**由于Node.js运行在谷歌的V8 JavaScript引擎上，它的代码执行**速度非常快** 。
* **异步性：**作为一个事件驱动的环境，Node.js能够在短时间内**处理大量的请求** 。
* **跨平台兼容性和可扩展性。N**odeJS可以在各种平台上工作，包括 **Windows** 、 **Unix** 、 **Linux** 、**Mac OS X**和 **移动设备** 。它可以与适当的包一起使用，创建一个100%自力更生的可执行文件。
* **软件包。**在NPM生态系统中有一系列开源的Node.js**包** ，可以 **简化开发者的工作** 。

## Node.js是用于前端还是后端？

一个常见的误解是，Node.js主要用于后端框架和开发服务器，但事实并非如此：Node.js**既可用于前端也可用于后端。**

**Node.js框架的事件驱动、非阻塞性质**使其成为开发者中的热门选择。由于它的适应性进化和最小的资源要求，Node.js已经成为eBay、Uber和微软等商业巨头的标准。

值得注意的是，Node.js是**流行的以Javascript为中心的MEAN和MERN技术栈**的一部分，涵盖了整个网络开发管道。

让我们来看看Node.js是如何工作的，如何应用于前端和后端。

### 前端应用

* **模块捆绑器。** [模块捆绑器是](https://link.juejin.cn?target=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Flets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae%2F "https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/")一种工具，它将代码文件的片段捆绑成一个文件，使我们的应用程序更顺利地执行。捆绑器的例子。 **[Webpack](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2F "https://webpack.js.org/")** , **[Rollup](https://link.juejin.cn?target=https%3A%2F%2Frollupjs.org%2Fguide%2Fen%2F "https://rollupjs.org/guide/en/")** , 和**[Browserify](https://link.juejin.cn?target=https%3A%2F%2Fbrowserify.org%2F "https://browserify.org/")**。
* **代码润色器。** [衬垫器是](https://link.juejin.cn?target=https%3A%2F%2Fwww.perforce.com%2Fblog%2Fqac%2Fwhat-lint-code-and-why-linting-important "https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important")一个帮助识别和纠正代码库中的问题的程序。它们可以检测到语法问题、开发团队定义的特殊标准以及编程错误--所谓的代码气味。自定义提示器提高了公司开发人员的整体效率。一个例子是**[ESLint](https://link.juejin.cn?target=https%3A%2F%2Feslint.org%2Fdocs%2Fuser-guide%2Fgetting-started "https://eslint.org/docs/user-guide/getting-started")**，用Node.js构建。
* **包** ：例如，[npm](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2F "https://www.npmjs.com/")提供了大量的包来帮助应用程序的编程过程。我们可以访问像文本编辑器、颜色选择器、认证组件等组件。构建前端就像收集所有必要的组件并将它们缝合在一起以创建一个无缝的、吸引人的用户界面一样简单明了。
* **样式设计**网页的造型通常是用CSS完成的。像[Bootstrap](https://link.juejin.cn?target=https%3A%2F%2Fgetbootstrap.com%2F "https://getbootstrap.com/")或[style-components](https://link.juejin.cn?target=https%3A%2F%2Fstyled-components.com%2F "https://styled-components.com/")这样的软件包使造型变得非常容易。例如，后者是一个为React.js编写的库，可以更容易地与JavaScript集成，因此导致用户互动的造型代码更有效。

### 后端应用

* **数据库集成** ：Node.js有一些库和接口，能够顺利进行数据库集成。数据库集成允许我们使用JavaScript进行数据库操作，使数据库的学习曲线更容易理解。
* **实时应用** ：性能和可扩展性是高度优先的应用，Node.js以其事件驱动的特性和非阻塞I/O来帮助。实际应用的例子可以是软件解决方案，如流媒体直播、实时物流、跟踪、社交网络平台，或硬件解决方案，如物联网（IoT）。
* **网络和API调用** ：当Node.js向API发送数据请求时，在收到数据之前，它不会停止。相反，在访问完一个API后，它将进入下一个API，来自Node.js事件的通知机制将向服务器反应之前的API请求。更简单地说，这些能力允许你在请求被处理的同时继续工作。**例子。**电子邮件或在线论坛。

### 在两端使用Node.js的主要好处

总而言之，Node.js在两端的应用有很多好处。

* **效率和生产力** - 由于减少了多种语言之间的上下文切换，开发人员可以 **节省大量时间** 。 因为许多技术是在后端和前端之间共享的，在这两端使用JavaScript会带来 **更大的效率** 。
* **可重用性** --众所周知，在Express.js和Meteor.js等框架的帮助下，JavaScript被用来编写后端和前端。例如，一些堆栈，如 **MERN** ，使用Express.js作为后端；在这里，多个 **组件可以在前端和后端之间重复使用** 。
* **建立一个社区** - 一个成功的开发周期的速度受到一个**繁荣的在线社区**的影响。当你被困在一个问题上时，很可能有人已经解决了这个问题，并将解决方案发布在**Stack Overflow**上。当涉及到流行的运行时及其软件包时，Node.js广泛地利用了这种动态和高度参与的社区。

## 使用Node.js构建的流行应用程序

### **Uber**

 **[Uber选择Node.js](https://link.juejin.cn?target=https%3A%2F%2Feng.uber.com%2Fuber-tech-stack-part-two%2F "https://eng.uber.com/uber-tech-stack-part-two/")**来创建它的大型匹配系统，因为它能够跟上**Uber大量业务需求的步伐** ，并具有更好的数据处理能力。它在很多方面都使公司受益。

* 它能快速 **处理大量的数据** 。
* **程序被审查，故障被纠正** ，无需重新启动，允许开发人员 **连续发布和部署新代码** 。
* 有一个**开源社区**在不断地改进技术，所以它有效地改进了自己。

### **Netflix**

Node.js最初被世界上最流行的视频流媒体服务使用，为其数百万用户提供高容量的在线流媒体。在这个早期架构中，Netflix试图提供可观察性（指标）、可调试性（诊断工具）和可用性（服务注册）。由此产生的架构被称为**[NodeQuark](https://link.juejin.cn?target=https%3A%2F%2Fopenjsf.org%2Fblog%2F2020%2F09%2F24%2Ffrom-streaming-to-studio-the-evolution-of-node-js-at-netflix%2F "https://openjsf.org/blog/2020/09/24/from-streaming-to-studio-the-evolution-of-node-js-at-netflix/")**。

 **NodeQuark基本上是认证并将请求引向应用网关** ，然后与API进行通信，并在返回给客户端之前准备好回复。Netflix与NodeQuark合作，创建了一个管理解决方案，允许团队为某些设备创建独特的API体验，使Netflix应用程序在一系列设备上发挥作用。

### **LinkedIn**

LinkedIn **从他们的同步Ruby on Rails移动应用切换到Node.js系统** ，因为前者需要客户为一个页面提出许多请求。由于其 **可扩展性，[Node.js](https://link.juejin.cn?target=https%3A%2F%2Fventurebeat.com%2F2011%2F08%2F16%2Flinkedin-node%2F "https://venturebeat.com/2011/08/16/linkedin-node/")给平台[带来了显著的性能改进](https://link.juejin.cn?target=https%3A%2F%2Fventurebeat.com%2F2011%2F08%2F16%2Flinkedin-node%2F "https://venturebeat.com/2011/08/16/linkedin-node/")** 。

* 增加了**流量**容量。
* **提高了性能** ，降低了内存开销。
* **现在，移动应用**在某些场景下的 **速度可达到20倍** 。
* 有**足够的空间**来处理目前10倍的资源利用水平。

### **贝宝**

PayPal的工程团队面临的主要问题是必须用不同的语言编写前端和后端。

 **[使用Node.js帮助他们的开发人员克服了浏览器和服务器之间的障碍](https://link.juejin.cn?target=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fhow-replacing-java-with-javascript-is-paying-off-for-paypal%2F%23%3A~%3Atext%3DPayPal%2520started%2520using%2520node.%2CGrunt%2520and%2520nconf%2520for%2520configuration "https://www.zdnet.com/article/how-replacing-java-with-javascript-is-paying-off-for-paypal/#:~:text=PayPal%20started%20using%20node.,Grunt%20and%20nconf%20for%20configuration")** ，允许用JavaScript开发浏览器和服务器应用程序。它将所有的工程技能合并到一个团队中，从而能够更好地理解和响应消费者的需求。

## 为什么要使用Node.js？

除了上述原因，Node.js还有很多 **其他的优势** ，比如。

* 拥有一个 **强大的社区和错误跟踪团队** 。
* **它可以用来建立广泛的应用程序** ，从单页应用程序（SPA），如投资组合、流媒体应用程序、电子商务应用程序到API和在线支付系统，如Paypal。
* 由于其支持的许多托管平台，托管Node.js代码 **不是一件麻烦事** 。
* 它是**轻量级**的。
* 它具有 **处理同时请求的能力** 。

## 什么时候不应该使用Node.js？

正如你现在可能已经理解的那样，Node.js在**事件驱动、数据密集、I/O密集和非阻塞的应用程序**上大放异彩。那么，Node.js的**缺点**是什么？

**重型计算应用**

主要的缺点是Node.js**不能做很多计算，**也就是说，它**不适合计算密集型应用。**比方说，你正在写一个计算斐波那契数的函数，这是计算密集型的--发生的情况是，**Node.js无法进入下一个线程，因为这个繁重的计算将阻塞应用程序中运行的单线程。**

**如果你的应用程序需要一些繁重的计算操作，但从Node.js的**一般 **功能中受益** ，理想的情况是将**繁重的计算任务作为背景进程**在另一种适当的语言中 **实现** 。通过使用[微服务架构](https://link.juejin.cn?target=https%3A%2F%2Fcloud.google.com%2Flearn%2Fwhat-is-microservices-architecture "https://cloud.google.com/learn/what-is-microservices-architecture")，你将把繁重的计算任务与Node.js的实现分开。

从本质上讲， **Node.js不应该被用于那些数据计算、处理器密集型和阻塞性的操作** ，因为它根本没有能力运行这些操作。

虽然还有其他的开源网络开发技术，但确实没有一个普遍的原则来决定哪种技术可以应用于网络和移动应用编程。如果你需要 **强大的性能，请使用Node.js** ，如果你需要**高的可扩展性，你可以转向其他框架，如**[Django](https://link.juejin.cn?target=https%3A%2F%2Fwww.imaginarycloud.com%2Fblog%2Fflask-vs-django%2F "https://www.imaginarycloud.com/blog/flask-vs-django/")**。确定你想建立什么形式的平台，就可以很容易地选择一个。

## 结论

总而言之， **Node.js的定位是一种以后端编程为目的的语言** 。与**Java**或**Python**这样的通用语言不同，它的功能并不十分广泛，因为运行环境并不打算同时覆盖很多领域
