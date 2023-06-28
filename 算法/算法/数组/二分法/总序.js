在一个左右两边都闭合的区间内求一个target, 查询成功返回下标, 否则返回 - 1
left = 0, right = length - 1
while (left <= right) {   // 第一个模糊边界，left是否可以等于right,这里在两边都闭合的区间内，因此符合条件
    if (middle < target) {
        left = middle + 1  // 目标值大于中间值，改变左边的边界； 第二个模糊边界：刚刚中间值已经与target对比过了，所以就让左边界在中间值的后一位
    } else if (middle > target) {
        right = middle - 1
    } else {
        return middle
    }
}

return -1 // 否则就是未查询到

在一个左闭右开的区间

left = 0, right = length - 1
while (left <  right) {   // 第一个模糊边界，left是否可以等于right,因为右边的边界为开区间，因此左边不用等于右边
    if (middle < target) {
        left = middle   // 目标值大于中间值，改变左边的边界； 第二个模糊边界：左边的值没有与target值比对过，所以直接赋值
    } else if (middle > target) {
        right = middle // 同理
    } else {
        return middle
    }
}
