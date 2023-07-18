<template>
    <div class="m-2">
        <Table
            v-bind="getBindProperties"
        >
            <template #title>
                <slot name="title"></slot>
            </template>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { computed, isRef, type ComputedRef, ref, unref, toRaw, watch } from 'vue';
import type { ActionType } from './types/table';
import type { BaseTableProps } from './types/table';
import type { BaseColumns } from './types/columns';

defineOptions({
    name: 'BaseTable'
})

const emits = defineEmits(['register'])
const selfPropsRef = ref<Partial<BaseTableProps>>()

const getBindProperties = computed(() => {
    return {
        columns: toRaw(getColumnsComp.value),
        dataSource: getDataSourceComp.value
    }
})

const computedProps = computed(() => ({ ...selfPropsRef.value }))



const reload = async () => {
    return {

    }
}

const useColumns = (props: ComputedRef<BaseTableProps>) => {
    const getColumnsComp = computed(() => ref(unref(props).columns ?? []).value)
    
    return {
        getColumnsComp
    }
}

const useDataSource = (props: ComputedRef<BaseTableProps>) => {
    const getDataSourceComp = computed(() => ref(unref(props).dataSource ?? []).value)

    return {
        getDataSourceComp
    }
}

const { getColumnsComp } = useColumns(computedProps as ComputedRef<BaseTableProps>)
const { getDataSourceComp } = useDataSource(computedProps as ComputedRef<BaseTableProps>)

const setProps = (properties: BaseTableProps) => {
    selfPropsRef.value = {
        ...unref(properties)
    }
}
const action: ActionType = {
    reload,
    setProps
}
emits('register', action)
</script>