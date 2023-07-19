import { ref, unref } from 'vue'
import type { BaseTableProps, ActionType } from '../types/table'

export const useTable = (options: BaseTableProps): [(arg: any) => void, ActionType] => {
    const instanceRef = ref<MayNull<ActionType>>(null)
    function register(instanceAction: ActionType) {
        instanceRef.value = instanceAction

        options && instanceRef.value.setProps(options)
    }

    const getInstance = (): ActionType => {
        const instance = unref(instanceRef)
        if (!instance) {
            console.error('instance not be obtained!')
        }
        return unref(instanceRef)!
    }

    const tableMethod: ActionType = {
        async reload() {
            return await getInstance().reload()
        },
        setProps(props: BaseTableProps) {
            return getInstance().setProps(props)
        },
        getSelectItems<T = Recordable>() {
            return getInstance().getSelectItems()
        },
        clearSelectItems() {
            return getInstance().clearSelectItems()
        },
        getSelectItemsKey() {
            return getInstance().getSelectItemsKey()
        }
    }


    return [
        register,
        tableMethod
    ]
}