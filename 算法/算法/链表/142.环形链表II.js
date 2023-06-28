// 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。


var detectCycle = function(head) {
    while(head){
        if(head.title){
            return head
        }
        head.title=true
        head=head.next
    }
    return null
};

//
思路:如果该链表存在环形结构的话,使用快慢指针那么他们就必会相遇,当他们相遇的时候,再他们相遇的位置声明一个新的指针index2,同时在头节点
    声明一个新的指针index1,当他们相遇的时候,这个位置就是环的入口

    
var detectCycle = function(head) {
    let fast=head;
    let slow=head;
    let index1=head;
    while(fast && fast.next){
        fast=fast.next.next;
        slow=slow.next;
        if(fast===slow){
            let index2=fast;
            while(index1!==index2){
                index1=index1.next;
                index2=index2.next;
            }
            return index1;
        }
    }
    return null
};