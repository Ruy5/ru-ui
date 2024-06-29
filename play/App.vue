<template>
    <!-- <div style="width: 50vh;">
        <Rutable :data="tableData">
            <RutableColumn prop="date" label="日期" width="1"/>
            <RutableColumn  prop="name" label="姓名"  width="1"/>
            <RutableColumn label="删除"  width="1">
                <button>删除</button>
            </RutableColumn>
        </Rutable>
    </div> -->
    <RuMenuWp></RuMenuWp>
</template>

<script setup>
import { ref } from 'vue';


const tableData = ref([
    { date: '今天', name: 'Ruy5' },
    { date: '昨天', name: 'Kun' }
]);

</script>
