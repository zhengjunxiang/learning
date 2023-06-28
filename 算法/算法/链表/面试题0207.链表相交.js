// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

// 思路也就是既然是判断两个单链表的相交位置，那么从两个链表的末尾位置来看必然是相等的，所以就先判断两个链表的长度
// 再根据长度来判断，注意在获取长度的时候，cura的指向
var getIntersectionNode = function(headA, headB) {
    let a=0;
    let b=0;
    let sub=0;
    let cura=headA;
    let curb=headB;

    while(cura){
        a++;
        cura=cura.next;
    }

    while(curb){
        b++;
        curb=curb.next;
    }
    cura=headA;
    curb=headB;

    if(a>b){
        sub=a-b;
        while(sub--){
            cura=cura.next;
        }
        while(cura && cura!==curb){
            cura=cura.next;
            curb=curb.next;
        }
        return cura;
    }else{
        sub=b-a;
        while(sub--){
            curb=curb.next;
        }
       while(curb && cura!=curb){
           cura=cura.next;
           curb=curb.next;
       }
       return curb;
    }
};