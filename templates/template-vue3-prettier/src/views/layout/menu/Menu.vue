<template>
    <div :style="{ width: menuState.collapsed ? menuRef?.clientWidth : '250px' }">
        <div class="font-semibold text-16px mt-3 mb-3 ml-2">导航栏</div>
        <a-menu
            class="!border-none mt-2"
            ref="menuRef"
            mode="inline"
            v-model:openKeys="menuState.openKeys"
            v-model:selectedKeys="menuState.selectedKeys"
            :inline-collapsed="menuState.collapsed"
            :items="items"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuArray } from './menu';
import { useToggleStore } from '@/stores/toggleMenu'

const menuRef = ref<HTMLElement>();
const router = useRouter();
const route = useRoute()

const toggleMenu = useToggleStore()
const { menuState } = toggleMenu

watch(
    () => route.name,
    (val) => {
        menuState.selectedKeys = [val as string]
    }
)

const items = reactive(menuArray);

watch(
    () => menuState.openKeys,
    (val, oldVal) => {
        menuState.preOpenKeys = oldVal;
    }
);

watch(
    () => menuState.selectedKeys,
    (val) => {
        router.push({
            name: val[0] as string,
        });
    }
);
</script>
