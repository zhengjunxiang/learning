// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

第一种方法:双指针
使用一个指针指向头节点,再最开始让头节点的指针指向空,然后只要当前指针存在,就一直进行反转操作,借用临时变量记录cur.next
var reverseList = function(head) {
    let pre = null;
    let cur = head;
    let t;

    while(cur){
        t = cur.next;
        cur.next = pre;
        pre = cur;
        cur = t;
    }
    return pre;
};

