# 服务路径

请求 -> CDN层 -> 负载均衡层 -> WAF防火墙 -> 其他层 -> 最终到我们的服务器

将恶意流量拦截在外层后，业务集群就不用频繁运维（扩缩容，限流等），降低运维成本
业务集群也无需额外准备过多的资源应该攻击流量，节约成本
具备很好的通用性，容易移植到其他服务，带来稳定性收益

# 接入CDN层
CDN层会在最外层，方便紧急时刻，开启CDN缓存，或开启CDN付费项目来保护内部其他服务的安全。举个例：

比如百万，千万级别或更大的瞬时流量打进来，有可能把负载均衡层给打挂了，这样会影响整个公司的业务，就不仅仅是被攻击的那个服务了

CDN的防护能力有：CDN缓存，Robot检测，ip信誉库，构建自定义防护规则集（结合历史的攻击特征和业务形态） 等 （按付费等级开启）

另外提一嘴（个人观点），CDN厂商在全球有数不清的服务器，大的CDN厂商几乎能低于一切攻击，而且还会按保护等级收费（保护费）。我个人觉得，一些攻击很可能就是CDN厂商勾结黑产做的，相当于流氓收保护费，不交保护费，就砸店（攻击），让你知道痛了，然后乖乖买CDN保护服务。而且能发动千万级别以上的QPS，除了CDN厂商（本身就有超多服务器），普通人应该很难
# nginx限流

# 接入WAF防火墙
Web应用防火墙（Web Application Firewall）对网站业务流量进行多维度检测和防护，结合深度机器学习智能识别恶意请求特征和防御未知威胁，阻挡诸如SQL注入或跨站脚本等常见攻击，避免这些攻击影响Web应用程序的可用性、安全性或过度消耗资源，降低数据被篡改、失窃的风险。

Web攻击防护——覆盖OWASP常见安全威胁，通过预置丰富的信誉库，对恶意扫描器、IP、网马等威胁进行检测和拦截。

全面的攻击防护：支持SQL注入、XSS跨站脚本、文件包含、目录遍历、敏感文件访问、命令\代码注入、网页木马上传、第三方漏洞攻击等威胁检测和拦截。

识别精准：内置语义分析+正则双引擎，误报率更低；支持常见编码还原，识别变形攻击能力更强。

CC攻击防护 ——通过接口限速和人机识别，有效降低CC攻击(HTTP Flood)带来的业务影响

细粒度可选：WAF可以根据IP或cookie设置灵活的限速策略。

返回页面可定制：返回页面可自定义内容和类型，满足业务多样化需要。

安全可视化——提供简洁友好的控制界面，实时查看攻击信息和事件日志

策略事件集中配置：在管理端集中配置策略，快速下发，快速生效。

流量及事件统计信息：实时查看访问次数、安全事件的数量与类型、详细的日志信息。

精准访问控制 ——基于丰富的字段和逻辑条件组合，打造强大的精准访问控制策略

支持丰富的字段条件：基于IP、URL、Referer、User-Agent、Params等HTTP常见参数和字段的条件组合。

支持多种条件逻辑：支持包含、不包含、等于、不等于、前缀等于、前缀不等于等逻辑条件，设置阻断或放行策略。


# 其他防护层
不同的公司，对应不同的业务及自身的特点，可能还会有其他的防护层，比如针对单实例还有过载保护（判断当前服务状况是否过载，然后根据流量的优先级会动态的丢弃掉一些低优先级的请求，尽可能保证服务的正常运转）
# 提高源站的处理能力。
针对SSR服务，有2个建议

让ssr服务只处理根HTML的返回，其他的所有资源都要放到CDN上去

当攻击来临时，临时把SSR的降级到CSR