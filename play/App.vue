<template>
    <RuMenuWp>
        <RuMenuItemWp index="1">
            <div style="color: red;">菜单一</div>
        </RuMenuItemWp>
        <RuMenuItemWp index="2">菜单二</RuMenuItemWp>
        <RuSubMenuWp index="3">
            <template #title>item four</template>
            <RuMenuItemWp index="3-1">item one</RuMenuItemWp>
            <RuMenuItemWp index="3-2">item two</RuMenuItemWp>
            <RuMenuItemWp index="3-3">item three</RuMenuItemWp>
        </RuSubMenuWp>
    </RuMenuWp>
</template>

<script setup>

</script>