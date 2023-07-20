import { type ComputedRef, computed, ref, unref } from "vue"
import { type BaseTableProps } from "../types/table"
import type { BaseColumns } from "../types/columns"

export const useColumns = (props: ComputedRef<BaseTableProps>) => {
    const getColumnsComp = computed(() => {
        const columns = ref(unref(props).columns)
        const { actionColumn } = unref(props)
        
        if (actionColumn) {
            const operationIndex = columns.value.findIndex(item => item.key === 'operation')
            if (operationIndex >= 0) {
                Object.assign(columns.value[operationIndex], actionColumn)
            } else {
                actionColumn.key = 'operation'
                columns.value = columns.value.concat(actionColumn)
            }
        }
        return unref(columns)
    }) as ComputedRef<BaseColumns[]>
    
    return {
        getColumnsComp
    }
}