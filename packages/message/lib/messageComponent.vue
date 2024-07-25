<template>
    <transition name="ru-msg-fade" @before-leave="onclose" @after-leave="$emit('destroy')">
        <div class="ru-msg" v-show="show">
            {{ message }}
        </div>
    </transition>

  
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
    id: { type: String, default: "" },
    type: { type: String, default: "" },
    message: { type: String, default: "" },
    onclose: {type: Function}
})

const { id, type, message } = toRefs(props)

const show = ref(false)

const onclose = () => {
    props.onclose()
}

onMounted(() => {
    show.value = true;
    let timer = setTimeout(() => {
        show.value = false
        clearTimeout(timer)
    }, 2000)
})
</script>

<style scoped>
.ru-msg {
    transform: translate(-50%);
    min-width: 300px;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    border: solid 1px red;
    transition: all 1s, to;
    margin-bottom: 20px;
    background-color: aquamarine;
}

.ru-msg-fade-enter-from, .ru-msg-fade-leave-to {
    transform: translate(-50%, -100%);
}
</style>