<template>
  <div style="display: flex; justify-content: space-around;">
    <div v-for="column in columns" :key="column.label">{{ column.props.label }}</div>
  </div>
  <div>
  <div v-for="(row, rowIndex) in data" :key="rowIndex" style="display: flex; justify-content: space-around;" >
      <div v-for="(column, colIndex) in columns" :key="colIndex" >
        <template v-if="column.children">
            <component :is="column" :scope="row" :prop="column.prop"></component>
        </template>
        <template v-else>
            <component :is="column" :scope="row" ></component>
        </template>
      </div>
    </div>
  </div>
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
  const slotContent = slots.default?.() || [];

  slotContent.forEach(node => {
    if (node.type && node.type.name === 'RutableColumn') {
      columns.value.push(node);
    }
  });
});
</script>
