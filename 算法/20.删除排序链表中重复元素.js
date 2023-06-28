// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
// 输入：head = [1,1,2,3,3]
// 输出：[1,2,3]


var deleteDuplicates = function(head) {
    let node=new ListNode()    //new一个头节点
    let cur=node
    
    if(head==null){     //判断特殊情况，当head为空链表的时候
        return head
    }

    cur.next=head        //否则直接将链表中第一个节点穿上去
    head=head.next       //将链表后面的节点覆盖到链表的头节点
    cur=cur.next         //然后将针头换到新添加的节点


    while(head){          //当这个链表还存在的时候
        if(cur.val!=head.val){   //如果针头的值不等于链表中第一个节点的值，那么就穿上来
            cur.next=head       //将该节点穿到针上
            head=head.next      //将链表后面的值覆盖上来
            cur=cur.next        //同样将针头换到新添加的节点
        }else if(cur.val==head.val){   //当值相等的时候
            head=head.next          //直接将链表后面的值覆盖上来
            cur.next=head      //一定记得把针头指向链表的新头节点
        }
    }
    return node.next

};