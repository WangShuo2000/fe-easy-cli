<script setup lang="ts">
import { RouterView } from 'vue-router';
import Menu from '@/views/layout/menu/Menu.vue';
</script>

<template>
    <div class="containter">
        <Menu class="menu" />
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

.content {
    height: calc(100vh - 20px);
    @apply w-full border border-solid border-gray-200 rounded-lg overflow-y-scroll flex-1 ml-10px;
}
</style>
