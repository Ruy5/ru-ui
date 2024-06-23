<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.label">{{ column.props.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <template v-if="column.children">
            <td>
              <component :is="column" :scope="row" :prop="column.prop"></component>
            </td>
          </template>
          <template v-else>
            <td>
              <component :is="column" :scope="row" ></component>
            </td>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, provide, onMounted, useSlots } from 'vue';


defineOptions({
  name: 'Rutable'
});

const slots = useSlots();

console.log("slots", slots.default())

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const columns = ref([]);

const addColumn = column => {
  columns.value.push(column);
};

provide('addColumn', addColumn);

onMounted(() => {
  const slotContent = slots.default?.() || [];


  console.log(typeof  slotContent[2])
  slotContent.forEach(node => {
    if (node.type && node.type.name === 'RutableColumn') {
      columns.value.push(node);
    }
  });
});
</script>
