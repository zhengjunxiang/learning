// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

// 图示两个链表在节点 c1 开始相交：



// 题目数据 保证 整个链式结构中不存在环。

// 注意，函数返回结果后，链表必须 保持其原始结构 。

// 自定义评测：

// 评测系统 的输入如下（你设计的程序 不适用 此输入）：

// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
// listA - 第一个链表
// listB - 第二个链表
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。


// 思路就是先比较两个链表的长度，然后让两个链表从尾部对齐，再从最短的链表开始比较


var getIntersectionNode = function(headA, headB) {
    let a=0;
    let b=0;
    let sub=0;
    let cura=headA;
    let curb=headB;

    while(headA.next){
        a++;
        headA=headA.next;
    }
    while(headB.next){
        b++;
        headB=headB.next;
    }

    if(a>b){
        sub=a-b;
        while(sub--){
            cura=cura.next;
        }

        while(cura && cura!=curb){
            cura=cura.next;
            curb=curb.next;
        }
        
        return cura;
    }else{
        sub=b-a;
        while(sub--){
            curb=curb.next;
        }

        while(curb && curb!=cura){
            cura=cura.next;
            curb=curb.next;
        }

        return curb;
    }
};