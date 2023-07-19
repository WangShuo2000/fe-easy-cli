<template>
    <div class="m-2">
        <Table
            ref="tableRef"
            v-bind="getBindProperties"
        >
            <template #title>
                <a-tag
                    v-if="getBindProperties.rowSelection.showSelectedNumber"
                    class="!py-1 !px-3"
                    color="blue"
                >
                    已选中 <span class="font-bold">{{ getSelectItemsKey().length }}</span> 条数据
                </a-tag>
                <slot name="title"></slot>
            </template>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { computed, type ComputedRef, ref, unref, toRaw, watch, onMounted, type Ref, watchEffect } from 'vue';
import type { ActionType } from './types/table';
import type { BaseTableProps } from './types/table';
import type { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { findAllItem } from '@/utils/help'

defineOptions({
    name: 'BaseTable'
})

const emits = defineEmits(['register'])
const selfPropsRef = ref<Partial<BaseTableProps>>()
const tableRef = ref<HTMLElement>()
const tableData = ref<Recordable[]>([])

const getBindProperties = computed(() => {
    return {
        columns: toRaw(getColumnsComp.value),
        dataSource: getDataSourceComp.value,
        loading: getLoading.value,
        rowSelection: getRowSelectionRef.value
    }
})

const computedProps = computed(() => ({ ...selfPropsRef.value }))

const useColumns = (props: ComputedRef<BaseTableProps>) => {
    const getColumnsComp = computed(() => ref(unref(props).columns ?? []).value)
    
    return {
        getColumnsComp
    }
}

const useLoading = () => {
    const loadingRef = ref<boolean>(false)

    const getLoading = computed(() => loadingRef.value)
    const setLoading = (loading: boolean) => {
        loadingRef.value = loading
    }

    return {
        getLoading,
        setLoading
    }
}

const useDataSource = (props: ComputedRef<BaseTableProps>, tableData: Ref<Recordable[]>) => {
    const dataSourceRef = ref<Recordable[]>([])

    watch(
        () => props.value.dataSource,
        (val) => {
            const { api } = unref(props)
            if (!api && val) {
                setLoading(true)
                dataSourceRef.value = val
                setLoading(false)
            }
        },
        {
            immediate: true
        }
    )

    watchEffect(() => {
        tableData.value = unref(dataSourceRef)
    })

    const request = async () => {
        const { api, afterRequest, beforeRequest } = unref(props)
        const params = {}
        if (!api) {
            return
        }
        setLoading(true)
        try {
            if (beforeRequest) {
                const param = beforeRequest({})
                Object.assign(params, param)
            }
            const res = await api(params)
            if (afterRequest) {
                afterRequest(res)
            }
            dataSourceRef.value = res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    onMounted(() => {
        request()
    })

    const getDataSourceComp = computed(() => dataSourceRef.value)

    return {
        getDataSourceComp,
        request
    }
}



const useRowSelection = (props: ComputedRef<BaseTableProps>, tableData: Ref<Recordable[]>) => {
    const selectedRowRef = ref<Recordable[]>([])
    const selectedRowKeysRef = ref<string[]>([])

    watch(
        () => selectedRowKeysRef.value,
        () => {
            const { rowSelection } = unref(props)
            if (rowSelection) {
                const { onChange } = rowSelection
                if (onChange) {
                    onChange!(getSelectItemsKey(), getSelectItems())
                }
            }
        }
    )

    const onSelectChange = (changableRowKeys: string[]) => {
        selectedRowKeysRef.value = changableRowKeys;
        const allItems = findAllItem(
            toRaw(unref(tableData)).concat(toRaw(unref(selectedRowRef))),
            (item: any) => changableRowKeys.includes(item[unref(getKey)!]),
            { children: unref(props).childrenName ?? 'children' }
        )
        const tempArray: any[] = []
        changableRowKeys.forEach(key => {
            const current = allItems.find(item => item[unref(getKey)!] === key)
            current && tempArray.push(current)
        })
        selectedRowRef.value = tempArray
    };

    const getKey = computed(() => {
        const { key } = unref(props)
        return key ?? 'key'
    })

    const getRowSelectionRef: ComputedRef<TableRowSelection & { showSelectedNumber?: boolean }> = computed(() => {
        const { rowSelection } = unref(props)
        return {
            selectedRowKeys: unref(selectedRowKeysRef),
            hideDefaultSelections: false,
            ...rowSelection,
            onChange: onSelectChange,
        } as TableRowSelection
    })

    const getSelectItemsKey = (): string[] => {
        return unref(selectedRowKeysRef)
    }

    const getSelectItems = <T = Recordable>() => {
        return unref(selectedRowRef) as T[]
    }

    const clearSelectItems = () => {
        selectedRowRef.value = []
        selectedRowKeysRef.value = []
    }

    return {
        getRowSelectionRef,
        getSelectItemsKey,
        getSelectItems,
        clearSelectItems
    }
}

const { getColumnsComp } = useColumns(computedProps as ComputedRef<BaseTableProps>)
const { getDataSourceComp, request } = useDataSource(computedProps as ComputedRef<BaseTableProps>, tableData)
const { getLoading, setLoading } = useLoading()
const { getRowSelectionRef, getSelectItems, getSelectItemsKey, clearSelectItems } = useRowSelection(computedProps as ComputedRef<BaseTableProps>, tableData)

const reload = async () => {
    await request()
}

const setProps = (properties: BaseTableProps) => {
    selfPropsRef.value = {
        ...unref(properties)
    }
}

const action: ActionType = {
    reload,
    setProps,
    getSelectItems,
    clearSelectItems,
    getSelectItemsKey
}
emits('register', action)
</script>