<script setup lang="ts">
import { RouterView } from 'vue-router';
import Menu from '@/views/layout/menu/Menu.vue';
import Toggle from '@/views/layout/toggle/index.vue'
</script>

<template>
    <div class="containter">
        <Menu class="menu" />
        <Toggle class="toggle" />
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.containter {
    height: 100vh;
    width: 100%;
    display: flex;
    padding: 10px;
}

.menu {
    @apply shrink-0 border border-solid border-gray-200 rounded-lg;
}

.toggle {
    @apply h-full w-15px flex items-center justify-center cursor-pointer rounded hover:bg-slate-100
}

.content {
    height: calc(100vh - 20px);
    @apply w-full border border-solid border-gray-200 rounded-lg overflow-y-auto flex-1 ;
}
</style>
