<template>
    <template v-if="scope">
        <template v-if="prop">
            {{ scope[prop] }}
        </template>
        <template v-else>
            <slot :row="scope"></slot>
        </template>
    </template>
    <template v-else>{{ label }}</template>
</template>

<script setup>

defineOptions({
    name: 'RuTableColumn'
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