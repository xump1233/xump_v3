<script setup>
import ContextMenu from './components/ContextMenu.vue';
const list = [
  {
    label:'test1'
  },
  {
    label:'test2'
  },{
    label:'test3'
  },
  {
    label:'test4'
  }
]
</script>

<template>
  <div class="container">
    <ContextMenu :list="list">
    <div class="box1">
      <h1>box1</h1>
    </div>
    </ContextMenu>

    <ContextMenu>
      <div class="box2">
        <h1>box2</h1>
      </div>
    </ContextMenu>

    <ContextMenu>
      <div class="box3">
        <h1>box3</h1>
      </div>
    </ContextMenu>
  </div>
  
  
</template>

<style scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
  }
  .box1{
    width: 500px;
    height: 500px;
    background-color: #f66;
  }
  .box2{
    width: 150px;
    height: 180px;
    background-color: #6f6;
  }
  .box3{
    width: 300px;
    height: 200px;
    background-color: #66f;
  }
</style>