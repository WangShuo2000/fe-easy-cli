import { ref, watch, unref, toRaw, computed, type Ref, type ComputedRef } from "vue"
import { type BaseTableProps } from "../types/table"
import { type TableRowSelection } from "ant-design-vue/es/table/interface"
import { findAllItem } from "@/utils/help"

export const useRowSelection = (props: ComputedRef<BaseTableProps>, tableData: Ref<Recordable[]>) => {
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