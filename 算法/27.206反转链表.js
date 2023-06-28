


 function ListNode(val, next) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
var head = [1,2,3,4,5]

var reverseList = function(head) {
    var pre=null
    var next=null

    console.log(head.va);

    while(head!==null){   //当链表存在的时候
        next=head.next   //记录下一个节点的值在next上
        head.next=pre   //将当前节点指针域指向pre上,实现反转
        pre=head       //再将pre的值修改为当前节点，方便下一个节点修改指针域
        head=next      //将头节点换成下一个节点，继续上面的操作
    }
    return head.next
};
console.log(reverseList(head));
