<template>
  <div id="container" ref="container" @scroll="handleScroll">
    <div class="item" v-for="item in showList" :key="item.tid">
      <img :src="item.src" alt="">
      <span>{{item.text}}</span>
    </div>

    <div ref="blank"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      limit: 200,
      // maxPage:0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest()
        xhr.open('get', 'http://127.0.0.1:3000')
        xhr.send()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText))
            this.list = JSON.parse(xhr.responseText)
          }
        }
      })
    },
    handleScroll(){
      if(this.page>this.maxPag) return 

      const clientHeight=this.$refs.container.clientHeight
      const blankTop = this.$refs.blank.getBoundingClientRect().top
      if(blankTop<=clientHeight){  // 该空容器出现在可视区域内
         this.page++
      }
    }
  },
  computed:{
    maxPag(){
      return Math.ceil(this.list.length/this.limit)
  },
  showList(){
        return this.list.slice(0,this.page*this.limit)
      }
}
}
</script>

<style>
#container{
  height: 100vh;
  overflow: auto;
}
</style>




