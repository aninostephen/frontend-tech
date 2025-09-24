import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TransactionOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/transactions',
      icon: <TransactionOutlined />,
      label: 'Transactions',
      children: [
        {
          key: '/transactions',
          label: 'List',
        },
        {
          key: '/transactions/create',
          label: 'Create',
        },
      ],
    },
    {
      key: '/performance-overview',
      icon: <LineChartOutlined />,
      label: 'Performance Overview',
    },
    {
      key: '/holdings-snapshot',
      icon: <BarChartOutlined />,
      label: 'Holdings Snapshot',
    },
    {
      key: '/report',
      icon: <BarChartOutlined />,
      label: 'Report',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '/logout') {
      console.log('Logout clicked');
      return;
    }
    navigate(key);
  };

  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    const matchedItem = menuItems.find(item => {
      if (item.children) {
        return item.children.some(child => child.key === currentPath);
      }
      return item.key === currentPath;
    });
    
    return matchedItem ? [currentPath] : ['/'];
  };

  const getOpenKeys = () => {
    const currentPath = location.pathname;
    const openKeys: string[] = [];
    
    menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.key === currentPath);
        if (hasActiveChild) {
          openKeys.push(item.key);
        }
      }
    });
    
    return openKeys;
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={256}
      collapsedWidth={80}
      className="sticky top-0 h-screen z-40 bg-slate-900 shadow-xl"
      style={{
        overflow: 'auto',
      }}
    >
      <div className={`${collapsed ? 'px-2 py-4' : 'px-6 py-4'} text-center border-b border-slate-700`}>
        <Title 
          level={collapsed ? 5 : 4} 
          className={`text-white m-0 font-bold ${collapsed ? 'text-sm' : 'text-lg'}`}
        >
          {collapsed ? 'FT' : 'Frontend Tech'}
        </Title>
      </div>

      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Main Menu */}
        <div className="flex-1 py-4">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none bg-transparent"
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
