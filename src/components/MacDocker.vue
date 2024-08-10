<script setup>
import { ref,onMounted } from 'vue';
import { useDocker } from '../hooks/useDocker';
const {createCurve} =useDocker(); 
const docker = ref();
const menu = ref();



onMounted(()=>{
    const items = menu.value.children;
    const range = 300;
    const maxScale = 2;
    docker.value.onmousemove = function (e) {
    const curve = createCurve(range, e.clientX, 1, maxScale);

    layout(curve);
    };
    function layout(curve) {
    for (const item of items) {
        const rect = item.getBoundingClientRect();
        const x = rect.x + rect.width / 2;
        const scale = curve(x);
        item.style.setProperty('--i', scale);
    }
    }
    docker.value.onmouseleave = function () {
    layout(() => 1);
    };
})


</script>

<template>
    <div class="docker-container">
      <div class="docker" ref="docker">
        <div class="menu" ref="menu">
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
          <div class="gap"></div>
          <div class="menu-item"></div>
        </div>
      </div>
    </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.docker-container {
  position: fixed;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.docker {
  box-sizing: content-box;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  border: 1px solid #aaa;
  border-radius: 5px;
  position: relative;
}

.menu {
  display: flex;
  align-items: end;
}
.menu-item {
  border-radius: 5px;
  width: calc(var(--i, 1) * 50px);
  height: calc(var(--i, 1) * 50px);
  margin-bottom: calc(var(--i, 1) * 15px - 15px);
  background: #b4433d;
  border: 1px solid #ccc;
  cursor: pointer;
}
.menu-item:nth-child(3n) {
  background: #1a862a;
}
.menu-item:nth-child(3n + 2) {
  background: #e8ad2d;
}
.gap {
  height: 100%;
  width: calc(var(--i, 1) * 10px);
  height: 30px;
}

@property --i {
  syntax: '<number>';
  initial-value: 1;
  inherits: false;
}

</style>