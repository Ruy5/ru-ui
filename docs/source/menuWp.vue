<template>
    <RuMenuWp>
        <RuMenuItemWp index="1">菜单一</RuMenuItemWp>
        <RuSubMenuWp index="2">
            <template #title>菜单二</template>
            <RuMenuItemWp index="2-1">子菜单一</RuMenuItemWp>
            <RuMenuItemWp index="2-2">子菜单二</RuMenuItemWp>
        </RuSubMenuWp>
        <RuMenuItemWp index="3">菜单三</RuMenuItemWp>
    </RuMenuWp>
</template>

<script setup>
import RuMenuWp from "@rui/menu/lib/menuWp.vue";
import RuMenuItemWp from "@rui/menu/lib/menuItemWp.vue";
import RuSubMenuWp from "@rui/menu/lib/subMenuWp.vue";
</script>