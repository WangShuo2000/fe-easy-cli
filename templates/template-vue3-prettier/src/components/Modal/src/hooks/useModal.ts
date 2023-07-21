import { onUnmounted, ref } from "vue"
import type { CallBackFn, ModalAction, ModalCommonMethod } from "../types/modal"

export const useModal = (): [ register: (arg: any, callBack: CallBackFn) => void, action: ModalAction ] => {
    const instanceRef = ref<MayNull<ModalCommonMethod>>(null)

    const getInstance = (): ModalCommonMethod => {
        if (!instanceRef) {
            console.error('instance not be obtained!')
        }
        return instanceRef.value!
    }

    let callBackFn: CallBackFn | null = null
    const register = (instanceAction: ModalAction, callBack: CallBackFn) => {
        instanceRef.value = instanceAction
        callBackFn = callBack
    }

    const action: ModalAction = {
        openModal(query) {
            callBackFn && typeof callBackFn === 'function' && callBackFn(query)
            getInstance().setProps({
                open: true
            })
        },
        closeModal() {
            getInstance().setProps({
                open: false
            })
        },
        setProps(props) {
            getInstance().setProps(props)
        },
    }

    onUnmounted(() => {
        instanceRef.value = null
        callBackFn = null
    })

    return [
        register,
        action
    ]
}