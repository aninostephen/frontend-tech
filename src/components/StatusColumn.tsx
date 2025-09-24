import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { StatusColumnProps } from '../core/Interface/StatusColumn';
import { defaultStatusMapping } from '../core/Dic/Status';

export const StatusColumn = <T extends Record<string, any>>({
  key = 'status',
  dataIndex = 'status',
  title = 'Status',
  width,
  statusMapping = defaultStatusMapping,
}: StatusColumnProps): ColumnsType<T>[0] => ({
  key,
  dataIndex,
  title,
  width,
  render: (text: string) => {
    const statusConfig = statusMapping[text] || { color: 'default' };
    const displayText = statusConfig.label || text;
    
    return (
      <Tag color={statusConfig.color}>
        {displayText}
      </Tag>
    );
  }
});
