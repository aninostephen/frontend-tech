import { Table as AntdTable, Button } from 'antd';
import type { ReusableTableProps } from '../core/Interface/ReusableTableProps';

const ReusableTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  onPaginationChange,
  rowKey = 'id',
  scroll,
  size = 'middle',
  bordered = false,
  showHeader = true,
  tableProps,
  lastKey,
  handleCursorPagiantion,
}: ReusableTableProps<T>) => {
  const handlePaginationChange = (page: number, pageSize: number) => {
    if (onPaginationChange) {
      onPaginationChange(page, pageSize);
    }
  };

  const paginationConfig = pagination
    ? {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: pagination.showSizeChanger ?? true,
        showQuickJumper: pagination.showQuickJumper ?? true,
        showTotal: pagination.showTotal ?? ((total: number, range: [number, number]) => 
          `${range[0]}-${range[1]} of ${total} items`
        ),
        onChange: handlePaginationChange,
        onShowSizeChange: handlePaginationChange,
        pageSizeOptions: ['10', '20', '50', '100'],
      }
    : false;
  
  const fetchPage = (pageSize: number, lastKey: string) => {
    if (handleCursorPagiantion) {
      handleCursorPagiantion(pageSize, lastKey);
    }
  }

  return (
    <>
      <AntdTable<T>
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey={rowKey}
        scroll={scroll}
        size={size}
        bordered={bordered}
        showHeader={showHeader}
        {...tableProps}
      />
      {lastKey && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Button onClick={() => fetchPage(10, lastKey)} loading={loading}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default ReusableTable;
