<template>
    <div class="ru-submenu-wp">
        <div class="submenu-title" @click="toggleSubMenu">
            <slot name="title"></slot>
        </div>
        <div v-if="isOpen" class="submenu-items">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

defineOptions({
    name: "RuSubMenuWp"
})

const props = defineProps({
    index: String,
    allowOpen: {
        type: Boolean,
        default: true
    }
});
const {allowOpen} = toRefs(props)

const isOpen = ref(allowOpen.value ? false : true);

function toggleSubMenu() {
    if(allowOpen.value == false) return
    isOpen.value = !isOpen.value;
}
</script>

<style scoped>
/* .ru-submenu-wp {
    
} */

.submenu-title {
    width: 100%;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0.6rem;
    color: black;
}

.submenu-title:hover {
    background-color: rgb(236, 236, 236);
    color: black;
}

.submenu-items {
    border-left: 1px dashed rgba(188, 195, 206, 0.5);
    margin-left: 10px;
}
</style>