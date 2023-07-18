import { ref } from 'vue'
import type { BaseTableProps, ActionType } from '../types/table'

export const useTable = (options: BaseTableProps): [(arg: any) => void, ActionType] => {
    const instanceRef = ref<ActionType | null>(null)
    function register(instanceAction: ActionType) {
        instanceRef.value = instanceAction

        options && instanceRef.value.setProps(options)
    }

    const tableMethod: ActionType = {
        async reload() {
            
        },
        setProps() {

        }
    }


    return [
        register,
        tableMethod
    ]
}