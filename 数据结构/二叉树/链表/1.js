//链表的结构
// {
//     val:1,    //数据域
//     next:{    //指针域，指向下一个节点的
//         val:2
//         next:
//     }
// }


//创建链表的节点
function ListNode(val){
    this.val=val
    this.next=null
}

//上一个节点的指针域指向当前节点的数据域
const node=new ListNode(1)
node.next=new ListNode(2)

node.next.next=new ListNode(3)


//在1和2之间增加一个节点
const node1=new ListNode(1)
const node3=new ListNode(3)
node1.next=node3

const node2=new ListNode(2)
node2.next=node1.next
node1.next=node2

//删除

