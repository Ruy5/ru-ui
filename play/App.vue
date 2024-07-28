<template>
  <input type="text" v-model="text">
  <button @click="cc">字符串传参</button>
  <button @click="hc" >h函数传参</button>
  <demo></demo>
</template>

<script setup>
import {Msg} from "@rui/core"
import {ref, h} from "vue"
import demo from "./demo";

let text = ref("")

const cc = () => {
  Msg(text.value)
}

const hc = () => {
  Msg(h('span', { style: { color: 'red' } }, '测试'))
}
</script>

<style scoped lang="scss">

</style>
