<script setup>
import { ref,onMounted,onBeforeUnmount,nextTick } from 'vue';
const fileBox = ref();
const edit = ref();
const image = ref();

const imgUrl = ref('');
const classList = ref({
    "select-box":true,
    "showIcon":true,
    "showPreview":false
})

const distance = ref({
    x:0,
    y:0,
    minX:0,
    minY:0,
    maxX:0,
    maxY:0
})

function selectImg(){
    fileBox.value.click();
}

function showImg(e){
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load',()=>{
        imgUrl.value = reader.result;
        classList.value.showIcon = false;
        classList.value.showPreview = true;
        nextTick(()=>{
            let rect = image.value.getBoundingClientRect();
            console.log(rect);
            distance.value.minX = rect.left;
            distance.value.minY = rect.top;
            distance.value.maxX = rect.left+rect.width;
            distance.value.maxY = rect.top+rect.height;
            edit.value.style.top = image.value.offsetTop + 'px';
            edit.value.style.left = image.value.offsetLeft + 'px';
        })
    })
}

function move(e){
    if(e.clientY - distance.value.y>distance.value.maxY){
        edit.value.style.top = distance.value.maxY + 'px';
    }
    else if(e.clientY - distance.value.y<distance.value.minY){
        edit.value.style.top = distance.value.minY + 'px';
    }
    else{
        edit.value.style.top = e.clientY - distance.value.y + 'px';
    }

    if(e.clientX - distance.value.x>distance.value.maxX){
        edit.value.style.left = distance.value.maxX + 'px';
    }
    else if(e.clientX - distance.value.x<distance.value.minX){
        edit.value.style.left = distance.value.minX + 'px';
    }
    else{
        edit.value.style.left = e.clientX - distance.value.x + 'px';
    }
    
    
    console.log('move');
}

onMounted(()=>{
    fileBox.value.addEventListener('change',showImg);
    edit.value.addEventListener('mousedown',(e)=>{
        document.body.style.userSelect = 'none'; 
        let rect = edit.value.getBoundingClientRect();
        distance.value.x = e.clientX - rect.left;
        distance.value.y = e.clientY - rect.top;
        window.addEventListener('mousemove',move);
    })
    edit.value.addEventListener('mouseup',(e)=>{
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove',move);
    })
    window.addEventListener('mouseup',()=>{
        window.removeEventListener('mousemove',move);
    })

})
onBeforeUnmount(()=>{
    fileBox.value.removeEventListener('change',showImg);
})

</script>

<template>
    <div :class="classList">
        <div class="select-icon">
            <svg @click="selectImg" t="1723257300093" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7559" width="48" height="48"><path d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z" p-id="7560" fill="#cdcdcd"></path></svg>
            <span>选择你要上传的图片</span>
        </div>
        <div class="select-preview">
            <img :src="imgUrl" ref="image">
            <div class="edit-box" ref="edit"></div>
        </div>
    </div>
    <input type="file" class="file-box" ref="fileBox">
</template>

<style scoped>
.select-box{
    --size:300px;
    width: var(--size);
    height: var(--size);
    border:2px dashed black;
    border-radius: 5px;
}
.showIcon>.select-icon{
    display: flex;
}
.showPreview>.select-preview{
    display: flex;
}
.select-icon{
    display: none;
    width: var(--size);
    height: var(--size);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* font-size: 64px; */
    color: #bbb;
}
.select-icon>svg{
    cursor: pointer;
}
.select-preview{
    display: none;
    width: var(--size);
    height: var(--size);
    justify-content: center;
    align-items: center;
    position: relative;
}
.select-preview>img{
    width:var(--size) ;
}
.file-box{
    display: none;
}

.edit-box{
    position: absolute;
    width: 50px;
    height: 50px;
    border:1px solid black;
    cursor:move;
    /* cursor:move; nw-resize sw-resize*/
}
</style>