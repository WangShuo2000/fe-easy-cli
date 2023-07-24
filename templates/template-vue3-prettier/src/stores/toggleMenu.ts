import { defineStore } from "pinia";
import { reactive } from "vue";

export const useToggleStore = defineStore('toggle', () => {
    const menuState = reactive({
        collapsed: false,
        selectedKeys: [''],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
    })

    function toggleCollapsed() {
        menuState.collapsed = !menuState.collapsed;
        menuState.openKeys = menuState.collapsed ? [] : menuState.preOpenKeys;
    }

    return {
        menuState,
        toggleCollapsed
    }
})