import ReusableTable from "../../components/Table";
import Wrapper from "../../core/Layout/Wrapper";
import type { Transaction } from "../../core/Interface/Transaction";
import { CreateColumns } from "./config/column";
import type { ColumnsType } from "antd/es/table";
import { useListHook } from "./config/useHook";

const List = () => {
    const {
        isLoading,
        pagination,
        data,
        handleEdit,
        handleDelete,
        handleView,
        searchValue,
        handleSearch,
        handleAddTransaction,
        lastKey,
        handleCursorPagiantion,
    } = useListHook();

    const columns = CreateColumns(handleEdit, handleDelete, handleView);

    return (
        <Wrapper
            title="Transactions"
            showSearch={true}
            showAddButton={true}
            addButtonText="Add Transaction"
            searchPlaceholder="Search transactions..."
            onSearch={handleSearch}
            onAdd={handleAddTransaction}
            searchValue={searchValue}
            loading={isLoading}
        >
            <ReusableTable<Transaction>
                data={data}
                columns={columns as ColumnsType<Transaction>}
                loading={isLoading}
                pagination={pagination}
                //onPaginationChange={() => {}}
                rowKey="id"
                bordered
                scroll={{ x: 800 }}
                lastKey={lastKey}
                handleCursorPagiantion={handleCursorPagiantion}
            />
        </Wrapper>
    );
}

export default List