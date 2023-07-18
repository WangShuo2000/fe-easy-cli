import { type ComputedRef } from 'vue'
import type { BaseColumns } from '../types/columns'

export type BaseTableProps = {
    api?: (...arg: any) => Promise<any>,
    columns: BaseColumns[] | ComputedRef<BaseColumns[]>,
    dataSource?: Record<string, any>[]
}

export type ActionType = {
    reload: () => Promise<any>,
    setProps: (arg: BaseTableProps) => void
}