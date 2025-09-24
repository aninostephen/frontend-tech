import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationConfig } from './Pagination';

export interface ReusableTableProps<T = any> {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  pagination?: PaginationConfig;
  onPaginationChange?: (page: number, pageSize: number) => void;
  rowKey?: string | ((record: T) => string);
  scroll?: { x?: number; y?: number };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  tableProps?: Omit<TableProps<T>, 'dataSource' | 'columns' | 'loading' | 'pagination'>;
  lastKey?: string;
  handleCursorPagiantion?: (pageSize: number, lastKey: string) => void;
}