import { Card, Row, Col, Statistic, Progress, Typography } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Revenue',
      value: 125840,
      prefix: '$',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      suffix: (
        <span className="flex items-center ml-2 text-green-600">
          <ArrowUpOutlined className="mr-1" />
          12.5%
        </span>
      ),
      icon: <DollarCircleOutlined className="text-2xl text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Total Orders',
      value: 2584,
      precision: 0,
      valueStyle: { color: '#1890ff' },
      suffix: (
        <span className="flex items-center ml-2 text-blue-600">
          <ArrowUpOutlined className="mr-1" />
          8.2%
        </span>
      ),
      icon: <ShoppingCartOutlined className="text-2xl text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Active Users',
      value: 15423,
      precision: 0,
      valueStyle: { color: '#722ed1' },
      suffix: (
        <span className="flex items-center ml-2 text-purple-600">
          <ArrowUpOutlined className="mr-1" />
          5.7%
        </span>
      ),
      icon: <UserOutlined className="text-2xl text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Conversion Rate',
      value: 87.4,
      precision: 1,
      suffix: '%',
      valueStyle: { color: '#fa8c16' },
      suffix2: (
        <span className="flex items-center ml-2 text-red-600">
          <ArrowDownOutlined className="mr-1" />
          2.1%
        </span>
      ),
      icon: <TrophyOutlined className="text-2xl text-orange-600" />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  const progressData = [
    { title: 'Sales Goal', percent: 78, status: 'active' as const, color: '#52c41a' },
    { title: 'User Engagement', percent: 92, status: 'active' as const, color: '#1890ff' },
    { title: 'Revenue Target', percent: 65, status: 'active' as const, color: '#722ed1' },
    { title: 'Customer Satisfaction', percent: 89, status: 'active' as const, color: '#fa8c16' },
  ];

  const recentActivities = [
    { id: 1, action: 'New order received', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'User registration', time: '5 minutes ago', type: 'info' },
    { id: 3, action: 'Payment processed', time: '10 minutes ago', type: 'success' },
    { id: 4, action: 'System maintenance', time: '1 hour ago', type: 'warning' },
    { id: 5, action: 'New feature deployed', time: '2 hours ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r p-6 rounded-lg shadow-lg">
        <Title level={2} className="text-white m-0 mb-2">
          Welcome back! 👋
        </Title>
        <Text className="text-blue-100 text-base">
          Here's what's happening with your business today.
        </Text>
      </div>
    </div>
  );
};

export default Dashboard;