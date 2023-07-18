<template>
    <div :style="{ width: state.collapsed ? menuRef?.clientWidth : '250px' }">
        <a-button type="primary" class="mb-16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="state.collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <a-menu
            ref="menuRef"
            mode="inline"
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            :inline-collapsed="state.collapsed"
            :items="items"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { menuArray } from './menu';

const menuRef = ref<HTMLElement>();
const router = useRouter();

const state = reactive({
    collapsed: false,
    selectedKeys: [menuArray[0].key],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
});
const items = reactive(menuArray);
watch(
    () => state.openKeys,
    (val, oldVal) => {
        console.log(val);
        state.preOpenKeys = oldVal;
    }
);

watch(
    () => state.selectedKeys,
    (val) => {
        router.push({
            name: val[0] as string,
        });
    }
);

const toggleCollapsed = () => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>
