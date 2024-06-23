<template>
    <RuTable :data="tableData">
        <RuTableColumn  prop="date" label="Date"/>
        <RuTableColumn  prop="name" label="Name"/>
        <RuTableColumn  prop="address" label="Address"/>
    </RuTable>

</template>

<script setup>
import RuTable from "@rui/table/lib/table.vue";
import RuTableColumn from "@rui/table/lib/tableColumn.vue";

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]

</script>