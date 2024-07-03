<template>
  <div class="ru-waterfall-container" >
    <div class="ru-waterfall-content" ref="contentRef">
      <div class="ru-waterfall-list">
        <div
          class="ru-waterfall-item"
          v-for="(item, index) in state.imageList"
          :key="item.id"
          :style="{
            width: `${state.imageWidth}px`,
            transform: `translate3d(${imagePos[index].x}px, ${imagePos[index].y}px, 0)`,
          }"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps(["gap", "column", "request", "page-size", "toload"]);

defineOptions({
  name: "RuWaterFall"
})

const rafThrottle = (fn) => {
  let lock = false;
  return function (...args) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      lock = false;
    });
  };
};

const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const contentRef = ref();

const columnHeight = ref([]);

const imagePos = ref([]);

const state = reactive({
  loading: false,
  isfinish: false,
  page: 1,
  imageWidth: 0,
  imageList: [],
});

const min = computed(() => {
  let minIndex = -1,
    minHeight = Infinity;
  for (let i = 0; i < columnHeight.value.length; i++) {
    const h = columnHeight.value[i];
    if (h < minHeight) {
      minIndex = i;
      minHeight = h;
    }
  }
  return {
    minIndex,
    minHeight,
  };
});

const getImageList = async (page, pageSize, isFirst) => {
  if(! props.toload){
    if(state.imageList.length > 0 ) {
      return;
    }
  }
  if (state.isfinish) return;
  state.loading = true;
  const list = await props.request(page, pageSize);
  state.page++;
  if (!list.length) {
    state.isfinish = true;
    return;
  }
  computedImagePos(list, isFirst);
  state.imageList = [...state.imageList, ...list];
  state.loading = false;
};

const computedImagePos = (list, isFirst) => {
  list.forEach((item, index) => {
    const imageHeight = Math.floor((item.height * state.imageWidth) / item.width);
    if (isFirst && index < props.column) {
      imagePos.value.push({
        x: index % props.column !== 0 ? index * state.imageWidth + props.gap * index : index * state.imageWidth,
        y: 0,
      });
      columnHeight.value.push(imageHeight + props.gap);
    } else {
      const { minIndex, minHeight } = min.value;
      imagePos.value.push({
        x:
          minIndex % props.column !== 0
            ? minIndex * state.imageWidth + props.gap * minIndex
            : minIndex * state.imageWidth,
        y: minHeight,
      });
      columnHeight.value[minIndex] += imageHeight + props.gap;
    }
  });
};

const handleScroll = rafThrottle(() => {
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value;
  const bottom = scrollHeight - clientHeight - scrollTop;
  if (bottom <= 100) {
    !state.loading && getImageList(state.page, props.pageSize, false);
  }
});

const handleResize = debounce(() => {
  if (contentRef.value) {
    state.imageWidth = (contentRef.value.clientWidth - (props.column - 1) * props.gap) / props.column;
    imagePos.value = [];
    columnHeight.value = [];
    computedImagePos(state.imageList, true);
  }
}, 300);

const init = () => {
  if (contentRef.value) {
    state.imageWidth = (contentRef.value.clientWidth - (props.column - 1) * props.gap) / props.column;
    getImageList(state.page, props.pageSize, true);
    contentRef.value.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  }
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  contentRef.value && contentRef.value.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.ru-waterfall {
  &-container {
    width: 100%;
    height: 100%;
  }

  &-content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  &-list {
    width: 100%;
    position: relative;
  }
  &-item {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    transition: all 0.3s;
  }
}
</style>
