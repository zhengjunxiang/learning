[原文链接](https://juejin.cn/post/6844904054074654728)
[原文链接2](https://juejin.cn/post/6844903951456796680)
# 浏览器中的进程
1.浏览器进程: 你可以理解浏览器进程为一个统一的"调度大师"去调度其他进程，比如我们在地址栏输入url时，浏览器进程首先会调用网络进程。 它可以做一些子进程管理以及一些存储的处理。

2.渲染进程: 这个进程对于我们来说是最重要的一个进程，每一个tab页都拥有独立的渲染进程，它的主要作用是渲染页面。

3.网络进程: 这个进程是控制对于一些静态资源的请求，它将资源请求完成之后会交给渲染进程进行渲染。

4.GPU进程: 这个进程可以调用硬件进行渲染，从而实现渲染加速。比如translate3d等css3属性会骗取调用GPU进程从而开启硬件加速。

5.插件进程: chrome中的插件也是一个独立的进程。

# 从输入URL到页面显示之间究竟发生了什么

当我们在地址栏中输入了一个url时，浏览器进程会监听到这次交互。紧接着它会分配出一个渲染进程进行准备渲染页面，同时浏览器进程会调用网络进程加载资源。等待网络进程加载完成资源后会将资源交给渲染进程进行页面的渲染。

从输入URL到页面加载发生了什么(大概)？
1）浏览器查找当前URL是否存在缓存，并比较缓存是否过期。（先判断HTTP请求浏览器是否已缓存）
有缓存
如为强制缓存，通过Expires或Cache-Control：max-age判断该缓存是否过期，未过期，直接使用该资源；Expires和max-age，如果两者同时存在，则被Cache-Control的max-age覆盖。
如为协商缓存，请求头部带上相关信息如if-none-match（Etag）与if-modified-since(last-modified)，验证缓存是否有效，若有效则返回状态码为304，若无效则重新返回资源，状态码为200
2）DNS解析URL对应的IP（DNS解析流程见下文）
3）根据IP建立TCP连接（三次握手）（握手过程见下文）
4）HTTP发起请求
5）服务器处理请求，浏览器接收HTTP响应
6）渲染页面，构建DOM树
①HTML 解析，生成DOM树
②根据 CSS 解析生成 CSS 树
③结合 DOM 树和 CSS 规则树，生成渲染树
④根据渲染树计算每一个节点的信息（layout布局）
⑤根据计算好的信息绘制页面
如果遇到 script 标签，则判断是否含有 defer 或者 async 属性，如果有，异步去下载该资源；如果没有设置，暂停dom的解析，去加载script的资源，然后执行该js代码（script标签加载和执行会阻塞页面的渲染）


##### 在网络协议七层模型中

1.通常我们会将应用层、表示层、会话层统称为应用层,应用层的主要协议就是HTTP协议。

2.传输层中我们浏览器中Http协议是基于tcp去进行网络传输。(常见传输协议的有tcp还有udp)

3.网络层中一般都是ip协议。

4.当然在数据链路层和物理层都是被称为物理层。

# 从输入URL到页面显示之间真正发生了什么

## DNS查询

根 DNS 服务器 ：返回顶级域 DNS 服务器的 IP 地址
顶级域 DNS 服务器：返回权威 DNS 服务器的 IP 地址
权威 DNS 服务器 ：返回相应主机的 IP 地址

DNS的域名查找
[总的查找过程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45e132f02931~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
在客户端和浏览器，本地DNS之间的查询方式是递归查询；

在客户端和浏览器，本地DNS之间的查询方式是递归查询递归查询：

在客户端输入 URL 后，会有一个递归查找的过程，从浏览器缓存中查找->本地的hosts文件查找->找本地DNS解析器缓存查找->本地DNS服务器查找，这个过程中任何一步找到了都会结束查找流程。

在本地DNS服务器与根域及其子域之间的查询方式是迭代查询；

如果本地DNS服务器无法查询到，则根据本地DNS服务器设置的转发器进行查询。若未用转发模式，则迭代查找过程如下图

[迭代查找过程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff48f72977d744~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 查找过程中的优化点

DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存。
在域名和 IP 的映射过程中，给了应用基于域名做负载均衡的机会，可以是简单的负载均衡，也可以根据地址和运营商做全局的负载均衡。

## 建立TCP连接

首先，判断是不是https的，如果是，则HTTPS其实是HTTP + SSL / TLS 两部分组成，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。
进行三次握手，建立TCP连接。


第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；


第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；


第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。

ACK：此标志表示应答域有效，就是说前面所说的TCP应答号将会包含在TCP数据包中；有两个取值：0和1，为1的时候表示应答域有效，反之为0。TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1。
SYN(SYNchronization)：在连接建立时用来同步序号。当SYN=1而ACK=0时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使SYN=1和ACK=1. 因此, SYN置1就表示这是一个连接请求或连接接受报文。
FIN(finis）即完，终结的意思， 用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接

SSL握手过程

第一阶段 建立安全能力 包括协议版本 会话Id 密码构件 压缩方法和初始随机数
第二阶段 服务器发送证书 密钥交换数据和证书请求，最后发送请求-相应阶段的结束信号
第三阶段 如果有证书请求客户端发送此证书 之后客户端发送密钥交换数据 也可以发送证书验证消息
第四阶段 变更密码构件和结束握手协议

## 发送HTTP请求，服务器处理请求，返回响应结果
TCP连接建立后，浏览器就可以利用HTTP／HTTPS协议向服务器发送请求了。服务器接受到请求，就解析请求头，如果头部有缓存相关信息如if-none-match与if-modified-since，则验证缓存是否有效，若有效则返回状态码为304，若无效则重新返回资源，状态码为200.


### 为什么有的网站第二次打卡会很快
DNS缓存

浏览器缓存，也称Http缓存，分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

#### 强缓存

强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

##### expires

```
expires: Wed, 12 Sep 2019 06:12:18 GMT

当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段
```
expires 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。expires 的问题在于对“本地时间”的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。

##### Cache-Control
考虑到 expires 的局限性，HTTP1.1 新增了Cache-Control字段来完成 expires 的任务。
```
cache-control: max-age=31536000
```
max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

Cache-Control 相对于 expires 更加准确，它的优先级也更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache-Control 为准。

#### 协商缓存
协商缓存依赖于服务端与浏览器之间的通信。协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端提示缓存资源未改动（Not Modified），资源会被重定向到浏览器缓存，这种情况下网络请求对应的状态码是 304。

##### Last-Modified

##### Etag
##### 为什么dns解析是基于udp而非tcp协议
我们的dns解析过程是一个服务器的查找过程。因为域名分为一级/二级...域名，所以每一级域名都会迭代去查询如果它采用tcp协议的话，每经过一次域名查询，域名服务器都会经过三次握手。 如果是基于tcp协议进行域名查找的话每一次tcp协议都会进行三次握手。但是udp就不会，他会直接发包然后确认。

相较于udp，tcp是更加安全，可靠的(因为三次握手以及四次挥手)但是这也造成了它相对于udp消耗更多时间。
udp常用的场景是视频或者直播中，对于我们来说dns解析中使用udp更多的原因是因为udp的速度，当然即使丢包了，我们重新发送就可以了。tcp传输的过程称为分段传输，也就是会拆分为多个包，一个包一个包的进行发送得到响应之后在发送下一个包。这样的方式无疑带来的有点是更加可靠和安全。但是在时效上并不如udp协议的实时(直接通信无需建立连接)。


## 页面构建


* 构建 DOM 树 --- 渲染进程将 HTML 内容转换为能够读懂DOM 树结构。
* 样式计算 --- 渲染引擎将 CSS 样式表转化为浏览器可以理解的styleSheets，计算出 DOM 节点的样式。
* 布局阶段 --- 创建布局树，并计算元素的布局信息。排除 display: none 的节点，计算元素的位置信息，确定元素的位置，构建一棵只包含可见元素布局树。
* 分层 --- 对布局树进行分层，并生成分层树。对拥有层叠上下文属性的元素，如一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树。
* 栅格化 --- 合成线程会将图层划分为图块，然后按照视口附近的图块来优先生成位图(实际生成位图的操作是由栅格化来执行的。所谓栅格化，是指将图块转换为位图)。
* 显示 --- 合成线程发送绘制图块命令给浏览器进程。浏览器进程根据指令生成页面，并显示到显示器上。


### 重绘 和 回流
创建布局树，遍历 DOM 树中的所有可见节点，并把这些节点加到布局中，布局完成过程中，如果有js操作或者其他操作。
**重绘**  对元素的颜色，背景等作出改变就会引起重绘
**回流**  如果有对元素的大小、定位等有改变则会引起回流

#### 常见的会导致回流的元素：

* 常见的几何属性有 width、height、padding、margin、left、top、border 等等。
* 最容易被忽略的操作：获取一些需要通过即时计算得到的属性,当你要用到像这样的属性：offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时，浏览器为了获取这些值，也会进行回流。
* 当我们调用了 getComputedStyle 方法，或者 IE 里的 currentStyle 时，也会触发回流。原理是一样的，都为求一个“即时性”和“准确性”。



重绘不一定导致回流，回流一定会导致重绘。
