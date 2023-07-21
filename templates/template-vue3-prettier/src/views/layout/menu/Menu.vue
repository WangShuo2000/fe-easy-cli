<template>
    <div :style="{ width: menuState.collapsed ? menuRef?.clientWidth : '250px' }">
        <a-button type="primary" class="mb-16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="menuState.collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <a-menu
            class="!border-none"
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
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { menuArray } from './menu';

const menuRef = ref<HTMLElement>();
const router = useRouter();
const route = useRoute()

watch(
    () => route.name,
    (val) => {
        menuState.selectedKeys = [val as string]
    }
)

const items = reactive(menuArray);

const menuState = reactive({
    collapsed: false,
    selectedKeys: [''],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
});
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

const toggleCollapsed = () => {
    menuState.collapsed = !menuState.collapsed;
    menuState.openKeys = menuState.collapsed ? [] : menuState.preOpenKeys;
};
</script>
