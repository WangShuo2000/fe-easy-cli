import type { BaseColumns } from "@/components/Table/src/types/columns";
import { Tag } from "ant-design-vue";

type TableDataType = {
    key: string;
    age: string;
    address: string;
    status: string;
};

export const columns: BaseColumns[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'status',
        dataIndex: 'status',
        customRender: ({ record }) => (
            <>
                <Tag color="green">
                    {record.status}
                </Tag>
            </>
        )
    }
];