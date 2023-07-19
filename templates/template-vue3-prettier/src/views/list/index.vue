<template>
    <BaseTable @register="register">
        <template #title>
            <a-button @click="reload">刷新</a-button>
            <a-button @click="getSelect">获取选中</a-button>
            <a-button @click="clearSelect">清空选中</a-button>
        </template>
    </BaseTable>
</template>

<script lang="ts" setup>
import { BaseTable, useTable } from '@/components/Table'
import { columns } from './data'

const dataSource = [...Array(100)].map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    status: 'done'
}));

const [ register, { reload, getSelectItems, clearSelectItems } ] = useTable({
    dataSource,
    columns,
    beforeRequest(info) {
        return info
    },
    afterRequest(result) {
        console.log(result)
    },
    rowSelection: {
        type: 'checkbox',
        showSelectedNumber: true,
    }
})

const getSelect = () => {
    console.log(getSelectItems())
}

const clearSelect = () => {
    clearSelectItems()
}

</script>
