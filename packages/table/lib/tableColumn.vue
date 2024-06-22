<!-- src/components/RutableColumn.vue -->
<template>
    <div></div>
</template>

<script setup>
import { defineProps } from 'vue';

defineOptions({
    name: 'RutableColumn'
});

const props = defineProps({
    prop: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: true
    }
});
</script>