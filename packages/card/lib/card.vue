<template>
  <div class="ru-card" :style="{
    width: width, height: height
  }">
    <slot></slot>
  </div>
</template>

<script setup>
import {toRefs} from "vue"
defineOptions({
  name: "RuCard"
})
const props = defineProps({
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  }
})

const { width, height } = toRefs(props)
</script>

<style scoped>
.ru-card {
  min-width: 230px;
  min-height: 100px;
  background-color: white;
  box-shadow: 0 0 0 0.5px rgba(188, 195, 206, 0.1), 0 2px 10px rgba(48, 55, 66, 0.06);
  border-radius: 0.6rem;
  box-sizing: border-box;
}
</style>