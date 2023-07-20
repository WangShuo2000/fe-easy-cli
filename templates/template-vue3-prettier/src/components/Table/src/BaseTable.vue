<template>
    <div class="m-2">
        <Table
            ref="tableRef"
            v-bind="getBindProperties"
            @change="handleTableChange"
        >
            <template #title>
                <component :is="TableTitleComponent" />
            </template>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { computed, type ComputedRef, ref, unref, toRaw } from 'vue';
import type { ActionType } from './types/table';
import type { BaseTableProps } from './types/table';
import { useTitle } from './hooks/useTitle'
import { useLoading } from './hooks/useLoading'
import { useDataSource } from './hooks/useDataSource'
import { useRowSelection } from './hooks/useRowSelection'
import { useColumns } from './hooks/useColumns'

defineOptions({
    name: 'BaseTable'
})
const slots = defineSlots()
const emits = defineEmits(['register'])
const props = defineProps({
    scroll: {
        type: Object,
        default: null
    }
})

const selfPropsRef = ref<Partial<BaseTableProps>>()
const tableRef = ref<HTMLElement>()
const tableData = ref<Recordable[]>([])

const getBindProperties = computed(() => {
    return {
        ...computedProps.value,
        columns: toRaw(getColumnsComp.value),
        dataSource: getDataSourceComp.value,
        loading: getLoading.value,
        rowSelection: getRowSelectionRef.value,
        pagination: paginationComp.value
    }
})

const computedProps = computed(() => ({ ...props, ...selfPropsRef.value }))

const setProps = (properties: BaseTableProps) => {
    selfPropsRef.value = {
        ...unref(properties)
    }
}

const { getColumnsComp } = useColumns(computedProps as ComputedRef<BaseTableProps>)
const { getLoading, setLoading } = useLoading()
const { getDataSourceComp, reload, handleTableChange, paginationComp } = useDataSource(computedProps as ComputedRef<BaseTableProps>, tableData, setLoading)
const { getRowSelectionRef, getSelectItems, getSelectItemsKey, clearSelectItems } = useRowSelection(computedProps as ComputedRef<BaseTableProps>, tableData)
const { TableTitleComponent } = useTitle(computedProps as ComputedRef<BaseTableProps>, slots, getSelectItemsKey, getLoading, reload)

const action: ActionType = {
    reload,
    setProps,
    getSelectItems,
    clearSelectItems,
    getSelectItemsKey
}
emits('register', action)
</script>

<style lang="less" scoped>
    :deep(.ant-table) {
        &-title {
            padding: 16px 0;
        }
    }
</style>