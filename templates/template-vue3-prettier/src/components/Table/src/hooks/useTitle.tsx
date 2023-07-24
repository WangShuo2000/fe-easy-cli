import { computed, unref, type ComputedRef, type Slots, type Ref, reactive } from "vue"
import type { BaseTableProps } from "../types/table"
import { Button, Checkbox, Tag } from "ant-design-vue"
import { InfoCircleFilled, ReloadOutlined, ColumnWidthOutlined } from "@ant-design/icons-vue"
import type { BaseColumns } from "../types/columns"

enum SlotsEnum {
    TITLE = 'title',
    TOOL = 'tool'
}

export const useTitle = (
    props: ComputedRef<BaseTableProps>,
    slots: Slots,
    getSelectItemsKey: () => string[],
    getLoading: ComputedRef<boolean>,
    reload: () => Promise<void>,
    showColumnSetting: () => void,
    getTitleModalComp: ComputedRef<boolean>,
    getColumnsComp: ComputedRef<BaseColumns[]>,
    setColumns: (columns: BaseColumns[]) => void
) => {
    
    const TableTitleComponent = computed(() => {
        const { rowSelection, toolSetting } = unref(props)
        const columns = unref(getColumnsComp)
        const titleCheck = reactive<Recordable>({})
        const titleList = columns.map(item => {
            Reflect.set(titleCheck, item.dataIndex as string, true)
            return {
                title: item.title,
                dataIndex: item.dataIndex
            }
        })

        const getColumns = localStorage.getItem('tableColumns')
        if (getColumns) {
            const storageColumns = JSON.parse(getColumns) as BaseColumns[]
            const newColumns = storageColumns.filter(item => titleCheck[item.dataIndex])
            setColumns(newColumns)
        } else {
            localStorage.setItem('tableColumns', JSON.stringify(columns))
        }

        const handleCheck = (dataIndex: string, checked: boolean) => {
            titleCheck[dataIndex] = checked
        }

        const TitleList = () => (
            <div>
                {titleList.map(item => <div>
                    <div class={'my-1 mx-2'}>
                        <Checkbox
                            class={'mr-2'}
                            checked={titleCheck[item.dataIndex as string]}
                            onUpdate:checked={(checked) => handleCheck(item.dataIndex as string, checked)}
                        />
                        {item.title}
                    </div>
                    <div class={'w-full h-1px bg-gray-200'}></div>
                </div>)}
            </div>
        )

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
                        <span class={'relative'}>
                            {
                                toolSetting?.columns &&
                                <Button shape="circle" class={'relative'} onClick={() => showColumnSetting()}>
                                    <ColumnWidthOutlined />
                                </Button>
                            }
                            {
                                getTitleModalComp.value &&
                                <div class={'absolute h-200px w-150px border border-solid border-gray-200 z-50 top-10 -left-100px bg-white rounded'}>
                                    <TitleList />
                                </div>
                            }
                        </span>
                    }
                    {
                        toolSetting?.reload &&
                        <Button shape="circle" class={'mx-2'} onClick={() => reload()}>
                            <ReloadOutlined
                                class={getLoading.value ? 'animate-spin' : ''}
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