<template>
  <div style="display: flex; background-color: aquamarine; border-radius: 10px; ">
    <div 
      v-for="column in columns" 
      :key="column.label" 
      :style="{
        width: (column.props.width ? column.props.width : 1 / widthTatol) * 100 + '%'
      }"
      class="ru-header-cell">{{ column.props.label }}</div>
  </div>
  <div>
    <div 
      v-for="(row, rowIndex) in data" 
      :key="rowIndex" 
      class="ru-body-line">
      <div v-for="(column, colIndex) in columns" 
        :key="colIndex" 
        :style="{width: (column.props.width ? column.props.width : 1 / widthTatol) * 100 + '%'}"
        class="ru-body-cell"
       >
        <template v-if="column.children">
          <component :is="column" :scope="row" :prop="column.prop"></component>
        </template>
        <template v-else>
          <component :is="column" :scope="row"></component>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, useSlots } from 'vue';


defineOptions({
  name: 'RuTable'
});

const widthTatol = ref(0)

const slots = useSlots();

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const columns = ref([]);

onMounted(() => {
  const slotContent = slots.default?.() || [];

  slotContent.forEach(node => {
    if (node.type && node.type.name === 'RuTableColumn') {
      widthTatol.value += node.props.width ? node.props.width : 1
      columns.value.push(node);
    }
  });
});
</script>


<style scoped>
.ru-header-cell {
  padding: 5px; box-sizing: border-box;
}
.ru-body-line {
  display: flex; 
  justify-content: space-around; 
  background-color: #f6f6f7; 
  border-radius: 10px; 
  line-height: 25px; 
  margin-top: 5px;   
}
.ru-body-cell {
  padding: 5px;
  box-sizing: border-box;
}
</style>