import { type ComputedRef } from 'vue'
import type { BaseColumns } from '../types/columns'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'

export type BaseTableProps = {
    api?: (params: any) => Promise<any>
    key?: string
    autoKey?: boolean
    childrenName?: string
    columns: BaseColumns[] | ComputedRef<BaseColumns[]>
    dataSource?: Recordable[]
    beforeRequest?: (params: any) => Recordable
    afterRequest?: (result: any) => void
    rowSelection?: TableRowSelection & { showSelectedNumber?: boolean }
}

export type ActionType = {
    reload: () => Promise<any>
    setProps: (arg: BaseTableProps) => void
    getSelectItems: <T = Recordable>() => T[]
    clearSelectItems: () => void
    getSelectItemsKey: () => string[]
}