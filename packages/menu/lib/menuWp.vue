<template>
    <div class="ru-menu-wp">
        <slot></slot>
    </div>
</template>

<script setup>
import { provide } from 'vue';

defineOptions({
    name: "RuMenuWp"
})

provide('menuIndex', 'root');
</script>

<style scoped>
.ru-menu-wp {
    width: 230px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 0 0.5px rgba(188, 195, 206, 0.1), 0 2px 10px rgba(48, 55, 66, 0.06);
    border-radius: 0.6rem;
    box-sizing: border-box;
}
</style>