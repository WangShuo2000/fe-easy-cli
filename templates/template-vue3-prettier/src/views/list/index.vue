<template>
    <BaseTable @register="register">
        <template #title>
            test
            <a-button @click="reload">刷新</a-button>
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
}));

const [ register, { reload } ] = useTable({
    dataSource,
    columns
})

</script>
