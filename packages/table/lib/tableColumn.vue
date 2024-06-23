
<template>
    <template v-if="scope">
        <template v-if="prop">
            {{ scope[prop] }}
        </template>
        <template v-else>
            <slot :row="scope"></slot>
        </template>
    </template>
    <th v-else >{{ label }}</th>
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
    scope: {
        type: Object
    },
    label: {
        type: String,
        required: true
    }
});
</script>