// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

//  

// 示例 1：


// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]
// 示例 2：

// 输入：head = [1], n = 1
// 输出：[]
// 示例 3：

// 输入：head = [1,2], n = 1
// 输出：[1]


var removeNthFromEnd = function(head, n) {
    let dummyNode = new ListNode();
    let fast=dummyNode;
    let slow=dummyNode;
    dummyNode.next=head;

    // 先移动fast指针n个位置
    while(n--){
        fast=fast.next;
    }
    // 再一起移动fast指针与slow指针
    while(fast.next){
        fast=fast.next;
        slow=slow.next;
    }
    // 改变slow的指向
    slow.next=slow.next.next;

    return dummyNode.next;
};

// 利用双指针法先把块指针往前移动n位,然后再同时移动快慢指针，再改变满指针的指向