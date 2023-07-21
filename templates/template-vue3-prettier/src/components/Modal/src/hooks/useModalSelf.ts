import { getCurrentInstance, unref, ref, onUnmounted } from "vue"
import type { CallBackFn, ModalCommonMethod, ModalSelfAction } from "../types/modal"

export const useModalSelf = (callBack?: CallBackFn): [ register: (instance: ModalCommonMethod) => void, action: ModalSelfAction ] => {
    const { emit } = getCurrentInstance()!
    
    const instanceRef = ref<MayNull<ModalCommonMethod>>(null)
    const register = (instance: ModalCommonMethod) => {
        emit('register', instance, callBack)
        instanceRef.value = instance
    }

    const getInstance = (): ModalCommonMethod => {
        const instance = unref(instanceRef)
        if (!instance) {
            console.error('instance not be obtained!')
        }
        return instance!
    }
    const action: ModalSelfAction = {
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
    })

    return [
        register,
        action
    ]
}