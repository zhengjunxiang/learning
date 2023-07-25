<template>
  <div id="app">
    <List :listData="data" :itemSize="100" v-slot="slotprops">{{slotprops}}</List>
  </div>
</template>

<script>
import faker from 'faker'
import List from './components/Virtual-list.vue'
let data=[]
for(let i=0;i<10000;i++){
  data.push({
    id:i,
    value:faker.lorem.sentences()  // 生成长文本
  })
}
console.log(data);
export default {
  name: 'App',
  data(){
  return{
    data
  }
  },
  components: {
    List
  }
}
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
  margin: 0;
}
#app{
  height: 100%;

}
</style>
