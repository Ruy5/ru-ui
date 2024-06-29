<template>
    <div class="ru-menu-item-wp">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineOptions({
    name: "RuMenuItemWp"
})

const props = defineProps({
    index: String
});
</script>

<style scoped>
.ru-menu-item-wp {
    width: 100%;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0.6rem;
    color: black;
}

.ru-menu-item-wp:hover {
    background-color: rgb(236, 236, 236);
    color: black;
}
</style>