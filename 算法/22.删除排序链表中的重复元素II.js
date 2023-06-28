// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]

// 输入：head = [1,1,1,2,3]
// 输出：[2,3]



var deleteDuplicates = function(head) {
    if (!head || !head.next) {
      return head
    }
    // dummy
    let dummy = new ListNode()     //new一个空的节点
  
    dummy.next = head     //让这个空节点指向链表第一个节点
  
    // 指针
    let cur = dummy      //声明一个打工节点 cur
  
    while (cur.next && cur.next.next) {             //当第一个节点跟第二个节点存在的时候
      if (cur.next.val === cur.next.next.val) {     //如果链表的第一个节点和第二个节点的值相等
        let val = cur.next.val                      //我就先记录这个相等的值来，方便后续的判断
  
        while(cur.next && cur.next.val === val) {   //因为我要一个一个的删除这些重复出现的元素，所以当此时指针所指的元素存在并且它的值与记录的值相等的时候
          cur.next = cur.next.next                  //我就要删除这个重复出现的值，让后面的值覆盖上来。然后循环如果这些值满足条件就一个一个删除
        }
   
      } else {                                    //如果这两个节点不相等的话，就让指针指向下一个（这样就相当于我已经让这个节点连上来了）
        cur = cur.next
      }
    }
  
    return dummy.next
  };