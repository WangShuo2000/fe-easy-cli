<template>
    <BaseTable @register="register">
        <template #title>
            <a-button @click="getSelect">获取选中</a-button>
            <a-button @click="clearSelect">清空选中</a-button>
        </template>
        <template #tool>
            自定义tool
        </template>
    </BaseTable>
</template>

<script lang="tsx" setup>
import { BaseTable, useTable } from '@/components/Table'
import { columns } from './data'

defineOptions({
    name: 'Table'
})

const dataSource = [...Array(100)].map((_, i) => ({
    id: i,
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    status: 'done'
}));

const [ register, { getSelectItems, clearSelectItems } ] = useTable({
    dataSource,
    columns,
    pagination: true,
    beforeRequest(info) {
        return info
    },
    afterRequest(result) {
        console.log(result)
    },
    actionColumn: {
        title: 'action',
        dataIndex: 'action',
        fixed: 'right',
        customRender: ({ record }) => (
            <div>
                <a>编辑</a>
                <a 
                    class={'text-red-300 ml-2'}
                    //@ts-ignore
                    onClick={() => deleteItem(record.id)}
                >
                    删除
                </a>
            </div>
        )
    },
    rowSelection: {
        type: 'checkbox',
        showSelectedNumber: true,
    },
    toolSetting: {
        reload: true,
        columns: true
    },
})

const getSelect = () => {
    console.log(getSelectItems())
}

const clearSelect = () => {
    clearSelectItems()
}

const deleteItem = (id: string) => {
    console.log(id)
}

</script>
