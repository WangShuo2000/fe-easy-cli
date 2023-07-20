import { ref, unref } from "vue"
import type { ModalAction } from "../types/modal"

export const useModal = (): [ register: (arg: any) => void, action: ModalAction ] => {
    const instanceRef = ref<MayNull<ModalAction>>(null)

    const getInstance = (): ModalAction => {
        const instance = unref(instanceRef)
        if (!instance) {
            console.error('instance not be obtained!')
        }
        return instance!
    }

    const register = (instanceAction: ModalAction) => {
        instanceRef.value = instanceAction
    }

    const action = {
        openModal() {
            return getInstance().openModal()
        },
        closeModal() {
            return getInstance().closeModal()
        }
    }

    return [
        register,
        action
    ]
}