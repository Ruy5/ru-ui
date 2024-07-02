<template>
  <div class="waterfall-container">
    <FsWaterFall :gap="20" :column="6" :request="requestData" :page-size="30">
      <template #item="{ item }">
        <img  :src="item.url" alt="图片" class="image" lazy></img >
      </template>
    </FsWaterFall>
  </div>
</template>

<script setup>
// import FsWaterFall from "../components/FsWaterFall.vue";

const requestData = (page, pageSize) => {
  return new Promise((resolve) => {
    fetch(`https://www.vilipix.com/api/v1/picture/public?limit=${pageSize}&sort=hot&offset=${--page * pageSize}`)
      .then(async (res) => {
        const result = await res.json();
        const imageList = result.data.rows.map((i) => ({
          id: i.picture_id,
          url: i.original_url,
          height: i.height,
          width: i.width,
        }));
        resolve(imageList);
      });
  });
};
</script>

<style scoped lang="scss">
.waterfall-container {
  width: 100%;
  height: 100vh;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
