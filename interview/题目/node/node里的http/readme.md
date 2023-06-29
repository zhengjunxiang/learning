# OSI模型   
网络七层协议
1. 物理层
2. 数据链路层
3. 网络层   --- （IP协议）
4. 传输层   --- （TCP协议）
5. 会话层
6. 表示层
7. 应用层   --- （HTTP协议）文本协议

物联网输会示用


# HTTP
- 请求格式
GET / HTTP/1.1

key1:value1
key2:value2


- 响应格式
HTTP/1.1 状态码 状态描述
key1:value1
key2:value2
...


Body


# HTTP的内容协商机制


# stream 模块

# 强缓存
 设置Cache-Control:max-age=<second>,会开启强缓存

- 命中缓存的3个条件
1. 两次请求的url完全相同
2. 两次的动作相同 即：post/get
3. 请求头不带有Cache-Control:no-cache 和 Pragma:no-cache

# 协商缓存
 
 