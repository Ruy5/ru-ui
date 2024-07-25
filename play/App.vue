<template>
  <input type="text" v-model="text">
  <button @click="cc">123</button>
</template>

<script setup>
import {Msg} from "@rui/core"
import {ref} from "vue"


let text = ref("")

const cc = () => {
  Msg(text.value)
}

</script>

<style scoped lang="scss">

</style>
