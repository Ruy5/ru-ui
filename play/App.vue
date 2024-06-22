<template>
    <RuPagination ></RuPagination>
    <div style="width: 500px; height: 500px;">
        <RuRichtext v-model="h"></RuRichtext>
    </div>
    
    {{ h }}
</template>

<script setup>
import { ref } from 'vue';

const h = ref("1213 999 ")

</script>