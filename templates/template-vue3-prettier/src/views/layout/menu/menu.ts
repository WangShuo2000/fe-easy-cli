import { h } from 'vue';
import { HomeOutlined, TableOutlined, SnippetsOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';

type MenuItemType = ItemType & {
    url: string;
};

export const menuArray: MenuItemType[] = [
    {
        key: 'Home',
        icon: () => h(HomeOutlined),
        label: '首页',
        title: '首页',
        url: '/',
    },
    {
        key: 'Table',
        icon: () => h(TableOutlined),
        label: '列表',
        title: '列表',
        url: '/table',
    },
    {
        key: 'Modal',
        icon: () => h(SnippetsOutlined),
        label: '弹窗',
        title: '弹窗',
        url: '/modal',
    },
    {
        key: 'Combination',
        icon: () => h(AppstoreOutlined),
        label: '组合组件',
        title: '组合组件',
        url: '/combination'
    }
];
