<template>
  <div class="ru-menu-container">
    <template v-for="menu,index in data" :key="index">
        <div class="ru-menu-item" :class="index==0?'active': ''" >
            {{ menu.title }}
        </div>
        <div style="display: flex;" v-for="cmenu,index in menu.child" :key="index">
            <div class="ru-menu-item" style="border-left: 1px dashed rgba(188, 195, 206, 0.5); margin-left: 10px;">
                {{ cmenu.title }}
            </div>
        </div>
    </template>
   
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

defineOptions({
    name: "RuMenuWp"
})

const props = defineProps({
    data: {
        type: Array,
        default: [
            {
                title: "基础信息",
                link: ""
            },
            {
                title: "相关链接",
                link: "",
                child: [
                    {
                        title: "基础信息",
                        link: ""
                    }
                ]
            }
        ]
    }
})

const {data} = toRefs(props)

</script>

<style scoped>
.ru-menu-container{
    width: 230px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 0 0.5px rgba(188, 195, 206, 0.1), 0 2px 10px rgba(48, 55, 66, 0.06);
    border-radius: 0.6rem;
    box-sizing: border-box;
}
.ru-menu-item{
    width: 100%;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0.6rem;
    color: black;
}
.ru-menu-item:hover{
    background-color: rgb(236, 236, 236);
    color: black;
}
.active {
    background-color:#3366ff;
    color: white;
}
</style>