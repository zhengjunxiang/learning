// 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
//  

// 示例 1：


// 输入：head = [1,2,6,3,4,5,6], val = 6
// 输出：[1,2,3,4,5]
// 示例 2：

// 输入：head = [], val = 1
// 输出：[]
// 示例 3：

// 输入：head = [7,7,7,7], val = 7
// 输出：[]

第一种解法:因为头指针的去除与非头节点的去除方法不一样所以先去除头节点,再在排除了头节点的基础上,去确认此时除了头节点外的节点是否为空
var removeElements = function(head, val) {
    // 先排除头节点是否与目标值相等
    while(head && head.val==val){
        head=head.next
    }
      // 将头节点排除后排除空链表
    if(head == null){
        return head
    }
    // 排除了头节点再排除非头节点
    let pre=head;
    let cur=head.next;
    while(cur){
         if(cur.val==val){
            pre.next=cur.next;
            cur=cur.next;
        }else{
            pre=cur;
            cur=cur.next;
        }
    }
   
    return head;
};


第二种解法:虚拟头节点,先实例化一个虚拟头节点,将这个虚拟节点指向头节点使之成为头节点,然后头节点就可以跟非头节点一样的进行删除

var removeElements = function(head, val) {
    let node =new ListNode();   // 实例化一个头节点
    let pre =node;  // 这三步让虚拟头节点与头节点产生关系
    let cur=head;
    pre.next=head;

    if(!head){   // 判断链表是否存在
        return head;
    }

    while(cur){  // 当节点存在的时候 
        if(cur.val==val){
            pre.next=cur.next;
             cur=cur.next;
        }else{
            pre=pre.next;
            cur=cur.next;
        }
    }

    return node.next;
};


