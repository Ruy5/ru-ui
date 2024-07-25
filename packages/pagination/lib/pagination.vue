<template>
  <div style="height:10%;text-align:right;margin-top:20px;display:flex;align-items:center;border-radius: 15px;padding-top: 10px;padding-bottom: 10px;
  justify-content:center;background-color: #fff;width: 15%;">
    <span>{{ (query.pageNum - 1) * 5 + 1 }} - {{ (query.pageNum - 1) * 5 + 5 }} of {{ total }}</span>
    <img src="./leftGrey.svg" v-show="dePage == 1 || query.pageNum == 1" />
    <img src="./rightColor.svg" style="transform:rotate(180deg)" @click=" search(0)"
      v-show="query.pageNum != 1 && query.pageNum <= dePage" />
    <img src="./leftGrey.svg" style="transform:rotate(180deg)" v-show="dePage == 1 || query.pageNum == dePage" />
    <img src="./rightColor.svg" @click="  search(1)" v-show="dePage != 1 && query.pageNum < dePage" />
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, onMounted, watch } from "vue";
defineOptions({
  name: "RuPagination"
})
const props = defineProps({
  total: {
    type: Number,
    require: true
  }
})

const total = ref(0)

watch(
  () => props.total,
  (newValue, oldValue) => {
    total.value = newValue;
  }
);

const query = reactive({
  pageSize: 5,
  pageNum: 1,
})

const emit = defineEmits(["pagination"])



const dePage = ref(1)
const search = async (s) => {
  if (s == 0) {
    query.pageNum--
  } else if (s == 1) {
    query.pageNum++
  }
  await emit("pagination", query.pageNum, query.pageSize)

  total.value = props.total
  dePage.value = mathPage(total.value, query.pageSize)
  console.log(props.total)


}

search()

function mathPage(total, pageSize) {
  let v = total / pageSize
  if (v == 0) {
    return v + 1
  } else if (v.toString().indexOf(".") != -1) {
    return v = parseInt(v) + 1
  } else if (v.toString().indexOf(".") == -1) {
    return v
  }
}

</script>