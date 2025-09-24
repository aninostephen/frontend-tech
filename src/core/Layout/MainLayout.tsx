import React, { useState } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items: Array<{ title: React.ReactNode }> = [{ title: 'Home' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1);
      items.push({
        title: index === pathSegments.length - 1 ? title : <a href={currentPath}>{title}</a>,
      });
    });

    return items;
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/transactions':
        return 'Transactions';
      case '/transactions/create':
        return 'Create Transaction';
      case '/transactions/edit':
        return 'Edit Transaction';
      case '/users':
        return 'Users';
      case '/settings':
        return 'Settings';
      default:
        return 'Page';
    }
  };

  return (
    <Layout className="h-screen bg-gray-50 overflow-hidden">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      
      <Layout
        className="h-screen flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
      >
        <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center w-10 h-10 text-lg hover:bg-gray-100 transition-colors"
            />
            <h1 className="text-xl font-semibold text-gray-800 m-0">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome back!</span>
          </div>
        </Header>

        <Content className="p-6 flex-1 overflow-y-auto">
          <Breadcrumb 
            items={getBreadcrumbItems()} 
            className="mb-4"
          />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {children}
            </div>
          </div>
        </Content>

        <Footer className="text-center py-4 bg-white border-t border-gray-200 text-gray-600 text-sm">
          Frontend Tech © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
