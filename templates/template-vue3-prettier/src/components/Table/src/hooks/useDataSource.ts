import { type ComputedRef, type Ref, ref, computed, watch, watchEffect, unref, onMounted } from "vue"
import { type BaseTableProps } from "../types/table"
import type { TablePaginationConfig, TableProps } from "ant-design-vue";
import { usePagination } from 'vue-request';

type APIParams = {
    results: number
    page?: number
    sortField?: string
    sortOrder?: number
    [key: string]: any
}

const defaultApiParams: APIParams = {
    page: 1,
    results: 10,
}

export const useDataSource = (
    props: ComputedRef<BaseTableProps>,
    tableData: Ref<Recordable[]>,
    setLoading: (loading: boolean) => void
) => {
    const dataSourceRef = ref<Recordable[]>([])
    const { api } = unref(props)

    watch(
        () => props.value.dataSource,
        (val) => {
            const { api } = unref(props)
            if (!api && val) {
                setLoading(true)
                dataSourceRef.value = val
                setLoading(false)
            }
        },
        {
            immediate: true
        }
    )

    watchEffect(() => {
        tableData.value = unref(dataSourceRef)
    })

    const { data, run, current, pageSize, total } = usePagination(api!, {
        pagination: {
            totalKey: 'total',
            currentKey: 'page',
            pageSizeKey: 'total',
        },
    })

    const paginationComp = computed(() => ({
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
    }));

    const request = async (apiParams = defaultApiParams) => {
        const { api, afterRequest, beforeRequest } = unref(props)
        const params = { ...apiParams }
        if (!api) {
            return
        }
        setLoading(true)
        try {
            if (beforeRequest) {
                const param = beforeRequest({})
                Object.assign(params, param)
            }
            run(params)
            if (afterRequest) {
                afterRequest(data.value)
            }
            dataSourceRef.value = data.value
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const reload = async () => {
        await request()
    }

    const handleTableChange: TableProps['onChange'] = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter: any
    ) => {
        const params: APIParams = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        }
        request(params)
    }

    onMounted(() => {
        request()
    })

    const getDataSourceComp = computed(() => dataSourceRef.value)

    return {
        getDataSourceComp,
        request,
        reload,
        handleTableChange,
        paginationComp
    }
}