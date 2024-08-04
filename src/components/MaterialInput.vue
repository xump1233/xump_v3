<script setup>
import { defineProps } from 'vue';

const porps = defineProps(['label']);
const label = porps.label;
</script>

<template>
    <div class="form-item">
        <input required type="text" id="inputBox" @change="$attrs.onGetValue($event.target.value)">
        <span class="bar"></span>
        <label for="inputBox">{{label}}</label>
    </div>
</template>

<style scoped>
.form-item{
    position: relative;
    margin:50px;
}
.form-item>input{
    border:none;
    border-bottom: 1px solid #999;
}
.form-item>.bar{
    border-bottom: 2px solid #333;
    position: absolute;
    display: block;
    width: 0;
    left:50%;
    transition: 0.3s all;
    transform: translateX(-50%);
}
.form-item>label{
    position: absolute;
    inset: 0;
    color:#999;
    transition: 0.3s all;
}
.form-item>input:focus ~ .bar{
    width: 100%;
}
.form-item>input:focus ~ label{
    color:#333;
    transform: translateY(-30px);
    font-size: 18px;
}
.form-item>input:focus-visible{
    outline: none;
}
.form-item>input:valid ~ label{
    color:#666;
    transform: translateY(-30px);
    font-size: 18px;
}
</style>