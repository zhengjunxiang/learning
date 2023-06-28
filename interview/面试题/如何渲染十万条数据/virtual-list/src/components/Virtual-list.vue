<template>
  <div class="list-container" @scroll="scrollevent" ref="list">  
    <div class="list-phantom" ref="phantom"></div>
    <div class="list" ref="content">
      <div class="list-item" ref="items" v-for="item in visibleData" :key="item._index">
        <slot :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    itemSize: {
      type: Number,
      default: 1
    },
    bufferScale: {
      // 缓冲
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      screenHeight: 0,
      positions: []
    };
  },
  computed: {
    _listData() {
      return this.listData.map((item, index) => {
        return {
          _index: `_${index}`,
          item
        };
      });
    },
    visibleCount() {
      // 显示的条数
      return Math.ceil(this.screenHeight / this.itemSize);
    },
    aboveCount() {
      return Math.min(this.start, this.bufferScale * this.visibleCount); // 最开始的十条
    },
    belowCount() {  // 最后的十条
      return Math.min(
        this.listData.length - this.end,
        this.bufferScale * this.visibleCount
      );
    },
    visibleData() {
      // 需要渲染的数据
      let start = this.start - this.aboveCount;
      let end = this.end + this.belowCount;
      return this._listData.slice(start, end);
    }
  },
  created() {
    this.initPositions();
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
    console.log(this.$el.clientHeight);
  },
  updated(){
    this.$nextTick(function(){
    if(!this.$refs.items || !this.$refs.items.length){
        return
    }
    // 更新列表高度
    let height=this.positions[this.positions.length-1].bottom
    this.$refs.phantop.getElementsByClassName.height=height+'px'
    this.setStartOffset()
    })
  },
  methods: {
    initPositions() {
      this.positions = this.listData.map((item, index) => ({
        index,
        height: this.itemSize,
        top: index * this.itemSize,
        bottom: (index + 1) * this.itemSize
      }));
    },
    scrollevent(){
        let listRef=this.$refs.list
        console.log(listRef.scrollTop);
        this.start=this.start+Math.floor(listRef.scrollTop/this.itemSize)
        this.end=this.start+this.visibleCount
    },
    getStartIndex(scrollTop=0){
        return this.binarySearch(this.positions,scrollTop)
    },
    binarySearch(list,value){
        let start=0;
        let end =list.length-1;
        let tempIndex=null;
        while(start<=end){
            let midIndex=parseInt((start+end)/2)
            let midValue=list[midIndex].bottom
            if(midValue===value){
                return midIndex +1
            }else if(midValue <value){
                start = midIndex+1
            }else if(midIndex > value){
                if(tempIndex ===null || tempIndex>midIndex){
                    tempIndex=midIndex
                }
                end=end-1
            }
        }

        return tempIndex
    },
    //获取当前的偏移量
    setStartOffset(){
      let startOffset;
      if(this.start >= 1){
        let size = this.positions[this.start].top - (this.positions[this.start - this.aboveCount] ? this.positions[this.start - this.aboveCount].top : 0);
        startOffset = this.positions[this.start - 1].bottom - size;
      }else{
        startOffset = 0;
      }
      this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`
    },
  }
};
</script>
  
  <style>
.list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
.list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
  height: 100px;
  overflow: hidden;
}
</style>