<!-- src/components/Rutable.vue -->
<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.label">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <slot :name="column.prop" :row="row">
            <span v-if="column.prop">{{ row[column.prop] }}</span>
            <template v-else>
              <slot :name="'col-' + colIndex" :row="row">
                <span>No Data</span>
              </slot>
            </template>
          </slot>
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
  const slotContent = slots.default();

  slotContent.forEach(node => {
    console.log(node)
    if (node.type && node.type.name === 'RutableColumn') {
      columns.value.push(node.props);
    }
  });
});
</script>
