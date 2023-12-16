import React, { useContext, useState } from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { GreyContent } from '../GreyContent/GreyContent';
import { AuthContext } from '../../context/AuthContext';

import styles from './MyLayout.module.scss';

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
  const location = useLocation(); //location.pathname
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem({
      label: 'Главная',
      key: '0',
      icon: <HomeOutlined />,
      onClick: () => navigate('/'),
    }),
    getItem({
      label: 'Меню',
      key: 'sub1',
      icon: <UserOutlined />,
      children: [
        getItem({
          label: 'Мои прогнозы',
          key: '2',
          onClick: () => navigate('/forecasts'),
        }),
        getItem({
          label: 'Создать прогноз',
          key: '4',
          onClick: () => navigate('/create'),
        }),
        getItem({
          label: 'Инструкции',
          key: '5',
          onClick: () => navigate('/instructions'),
        }),
        getItem({
          label: 'Настройки',
          key: '6',
          onClick: () => navigate('/settings'),
        }),
      ],
    }),
    getItem({
      label: 'Выйти',
      key: '1',
      icon: <LogoutOutlined />,
      onClick: () => logoutUser(),
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
        <GreyContent />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* <Header className={styles.header} /> */}
        <Content style={{ margin: '16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Prophet ©2023 Created by BulaDev
        </Footer>
      </Layout>
    </Layout>
  );
};
