<template>
  <RuTable :data="tableData">
      <RuTableColumn  prop="date" label="Date"  width="1"/>
      <RuTableColumn  prop="name" label="Name"  width="1"/>
      <RuTableColumn  prop="address" label="Address" width="2"/>
  </RuTable>

</template>

<script setup>

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