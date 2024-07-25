<template>
    <transition-group name="list" tag="div">
        <div id="ru-msg-group"></div>
    </transition-group>

    
</template>

<style scoped>
#ru-msg-group{
    position: fixed;
    top: 20px;
    left: 50%;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to  {
  opacity: 0;
  transform: translateY(30px);
}
.item {
  margin: 5px;
}
</style>