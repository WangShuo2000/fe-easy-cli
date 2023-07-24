<template>
    <div @click="toggle">
        <caret-left-outlined class="transition duration-300" :class="menuState.collapsed ? 'rotate-180' : ''" />
    </div>
</template>

<script lang="ts" setup>
    import { CaretLeftOutlined } from '@ant-design/icons-vue';
    import { useToggleStore } from '@/stores/toggleMenu'

    const toggleMenu = useToggleStore()
    const { menuState } = toggleMenu

    const toggle = () => {
        toggleMenu.toggleCollapsed()
    }
</script>