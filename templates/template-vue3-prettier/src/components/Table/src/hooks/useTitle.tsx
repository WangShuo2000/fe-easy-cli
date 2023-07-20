import { computed, unref, type ComputedRef, type Slots } from "vue"
import type { BaseTableProps } from "../types/table"
import { Button, Tag } from "ant-design-vue"
import { InfoCircleFilled, ReloadOutlined } from "@ant-design/icons-vue"

enum SlotsEnum {
    TITLE = 'title',
    TOOL = 'tool'
}

export const useTitle = (
    props: ComputedRef<BaseTableProps>,
    slots: Slots,
    getSelectItemsKey: () => string[],
    getLoading: ComputedRef<boolean>,
    reload: () => Promise<void>
) => {
    
    const TableTitleComponent = computed(() => {
        const { rowSelection, toolSetting } = unref(props)

        return (
            <div class={'flex justify-between'}>
                <div>
                    {
                        rowSelection?.showSelectedNumber && 
                        <Tag class={'!py-1 !px-3'} color="blue">
                            <InfoCircleFilled class={'mr-1'} />
                            已选中
                            <span class={'font-bold !mx-1'}>{getSelectItemsKey().length}</span>
                            条数据
                        </Tag>
                    } 
                    {slots[SlotsEnum.TITLE]!()}
                </div>
                <div>
                    {slots[SlotsEnum.TOOL]!()}
                    {
                        toolSetting?.reload &&
                        <Button shape="circle">
                            <ReloadOutlined
                                class={getLoading.value ? 'animate-spin' : ''}
                                onClick={() => reload()}
                            />
                        </Button>
                    }
                </div>
            </div>
        )
    })

    return {
        TableTitleComponent
    }
}