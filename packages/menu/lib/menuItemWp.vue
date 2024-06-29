<template>
    <div :class="['ru-menu-item-wp', { active: isActive }]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';

defineOptions({
    name: "RuMenuItemWp"
})


const props = defineProps({
    index: String
});

const state = inject('menuState');
const setActiveIndex = inject('setActiveIndex');

const isActive = computed(() => state.activeIndex === props.index);

function handleClick() {
    setActiveIndex(props.index);
}
</script>

<style scoped>
.ru-menu-item-wp {
    width: 100%;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0.6rem;
    color: black;
    cursor: pointer;
}

.ru-menu-item-wp:hover {
    background-color: rgb(236, 236, 236);
    color: black;
}

.active{
    background-color: #1890ff !important;
    color: white !important;
}
</style>