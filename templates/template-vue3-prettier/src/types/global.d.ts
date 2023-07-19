import type { VNode } from "vue"

declare global {
    declare type Recordable<T = any> = Record<string, T>
    declare type MayNull<T> = T | null

    namespace JSX {
        type Element = VNode
    }
}

export {}