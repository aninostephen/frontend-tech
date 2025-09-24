import { Button, Input, Space, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { WrapperProps } from '../Interface/WrapperProps';

const { Search } = Input;

const Wrapper = ({
  children,
  title,
  showSearch = true,
  showAddButton = true,
  addButtonText = 'Add New',
  searchPlaceholder = 'Search...',
  onSearch,
  onAdd,
  extra,
  searchValue,
  loading = false,
}: WrapperProps) => {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            {title && (
              <h2 className="text-xl font-semibold text-gray-800 m-0">
                {title}
              </h2>
            )}
          </Col>
          
          <Col xs={24} sm={12} md={16}>
            <div className="flex justify-end">
              <Space size="middle" wrap>
                {/* Search Input */}
                {showSearch && (
                  <Search
                    placeholder={searchPlaceholder}
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="middle"
                    onSearch={onSearch}
                    value={searchValue}
                    style={{ width: 250 }}
                    loading={loading}
                  />
                )}
                
                {/* Extra Components */}
                {extra}
                
                {/* Add Button */}
                {showAddButton && (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                    size="middle"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {addButtonText}
                  </Button>
                )}
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
