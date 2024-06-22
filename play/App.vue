<template>
    <Rutable :data="tableData">
        <RutableColumn prop="date" label="日期" />
        <RutableColumn prop="name" label="姓名" />
        <RutableColumn label="删除">
            <template #col-2="{ row }">
                <div @click="handleDelete">删除</div>
            </template>
        </RutableColumn>
    </Rutable>
</template>

<script setup>
import { ref } from 'vue';


const tableData = ref([
    { date: '2024-06-23', name: 'John Doe' },
    { date: '2024-06-24', name: 'Jane Doe' }
]);

const handleDelete = row => {
    tableData.value = tableData.value.filter(item => item !== row);
};
</script>
