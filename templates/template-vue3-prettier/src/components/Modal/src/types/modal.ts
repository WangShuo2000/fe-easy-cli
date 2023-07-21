import type { ComputedRef } from "vue"

type ModalProps = {
    open: boolean
    confirmLoading?: boolean,
}

export interface ModalCommonMethod {
    setProps: (props: Partial<ModalProps>) => void
}

export interface ModalAction extends ModalCommonMethod {
    openModal: <T = Recordable>(query?: T) => void
    closeModal: () => void
}

export interface ModalSelfAction extends ModalCommonMethod {
    closeModal: () => void
}

export type CallBackFn = (data?: any) => void