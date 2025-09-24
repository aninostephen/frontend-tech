import { ActionColumn } from "../../../components/ActionColumn";
import { StatusColumn } from "../../../components/StatusColumn";

export const CreateColumns = (
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
) => [
    {
        key: 'portfolio',
        dataIndex: 'portfolio',
        title: 'Portfolio',
        width: '200px',
        cellClassName: 'font-medium',
    },
    {
        key: 'instrument_id',
        dataIndex: 'instrument_id',
        title: 'Instrument',
        width: '200px',
        cellClassName: 'font-medium',
    },
    {
        key: 'price',
        dataIndex: 'price',
        title: 'Price',
    },
    {
        key: 'quantity',
        dataIndex: 'quantity',
        title: 'Quantity',
    },
    StatusColumn({
        key: 'status',
        dataIndex: 'status', 
        title: 'Status',
    }),
    ActionColumn({
        handleEdit: handleEdit,
        handleDeleteClick: handleDelete,
        hideView: false,
        handleView: handleView,
    }),
]