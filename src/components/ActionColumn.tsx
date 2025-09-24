import { Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ActionColumnProps } from '../core/Interface/ActionColumn';

export const ActionColumn = <T extends Record<string, any>>({ 
  handleEdit, 
  handleDeleteClick,
  hideView = false,
  handleView,
}: ActionColumnProps): ColumnsType<T>[0] => ({
  key: 'actions',
  title: 'Actions',
  width: 150,
  align: 'center',
  fixed: 'right',
  render: (_, record) => (
    <Space size="small">
      {!hideView && handleView && (
        <Button 
          type="text" 
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleView(record.id)}
          className="text-blue-600 hover:text-blue-800"
          title="View"
        />
      )}
      {handleEdit && (
        <Button 
          type="text" 
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
          className="text-green-600 hover:text-green-800"
          title="Edit"
        />
      )}
      {handleDeleteClick && (
        <Button 
          type="text" 
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClick(record)}
          className="text-red-600 hover:text-red-800"
          title="Delete"
          danger
        />
      )}
    </Space>
  )
}); 