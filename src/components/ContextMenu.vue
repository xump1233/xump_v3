<script setup>
import { ref,watchEffect,defineProps } from 'vue';
import { useContextMenu } from '../hooks/useContextMenu';


const box = ref(null);
const info = useContextMenu(box);
const position = ref(null);
const porps = defineProps(['list']);
console.log(porps)
if(porps){
    console.log(porps.value)
}

watchEffect(()=>{
    const isShow = info.isVisible.value?'block':'none';
    position.value = {
        left:info.x.value + 'px',
        top:info.y.value + 'px',
        display:isShow
    }
})

</script>

<template>
    <div class="container" ref="box">
        <slot></slot>
        <Teleport to="body">
            <div class="context-menu" :style="position">
                <ul>
                    <li>{{ info.x }}</li>
                    <li>{{ info.y }}</li>
                    <li>3</li>
                </ul>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.container{

}
.context-menu{
    position: fixed;
    
}
</style>