import React, { useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface IGetItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}

function getItem({ label, key, icon, children, onClick }: IGetItem): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

interface IMyLayout {
  children: React.ReactNode;
}

export const MyLayout: React.FC<IMyLayout> = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem({
      label: 'Главная',
      key: '0',
      icon: <HomeOutlined />,
      onClick: () => navigate('/'),
    }),
    getItem({
      label: 'Авторизация',
      key: 'sub1',
      icon: <UserOutlined />,
      children: [
        getItem({
          label: 'Войти',
          key: '1',
          onClick: () => navigate('/login'),
        }),
        getItem({
          label: 'Зарегистрироваться',
          key: '2',
          onClick: () => navigate('/registration'),
        }),
      ],
    }),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      >
        <div
          style={{
            height: '50px',
            backgroundColor: '#334454',
            margin: '10px',
            borderRadius: '5px',
          }}
        />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        {children}
        <Footer style={{ textAlign: 'center' }}>
          Prophet ©2023 Created by BulaDev
        </Footer>
      </Layout>
    </Layout>
  );
};
