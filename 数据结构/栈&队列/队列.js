// const queue=[]//队列
// queue.push('钟薛糕')
// queue.push('可爱多')
// queue.push('巧乐兹')
// queue.push('小不丁')

// while(queue.length){
//     const top=queue[0]
//     console.log('我想吃:'+top);
//     queue.shift()
// }


//如何将栈转换成队列(面试出的概率大)
//题目：使用栈实现队列的一下操作
// push(x)--队列尾部添加
// pop(x)--队列首部删除 
//peek()--返回队列首部元素
//empty()--返回队列是否为空


//用两个栈，将第一个栈放了东西，然后将这个栈里面的元素取出来依次放到另外一个栈里面，再取出来就是队列了
const Myqueue=function(){
    this.stack1=[]
    this.stack2=[]
}
Myqueue.prototype.push=function(x){
    this.stack1.push(x)
}
Myqueue.prototype.pop=function(){
    //判断栈2是否为空
    if(this.stack2.length===0){
        while(this.stack1.length!==0){
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop()
}
Myqueue.prototype.peek=function(){
    if(this.stack2.length===0){
        while(this.stack1.length!==0){
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2[this.stack2. length-1]
}
Myqueue.prototype.empty=function(){
    return !this.stack1.length && !this.stack2.length
}

queue=new Myqueue()
queue.push(1)
queue.push(2)
queue.peek()//1
queue.pop
queue.empty()//false