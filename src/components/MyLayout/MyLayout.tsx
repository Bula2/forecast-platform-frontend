import React, { useContext, useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { GreyContent } from '../GreyContent/GreyContent';
import { AuthContext } from '../../context/AuthContext';

import styles from './MyLayout.module.scss';
import { useMediaQuery } from '../../hooks';

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
  const media = useMediaQuery('(max-width: 680px)');
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  useEffect(() => {
    if (location) {
      if (currentLocation !== location.pathname) {
        setCurrentLocation(location.pathname);
      }
    }
  }, [location, currentLocation]);

  function handleClickOnLocation(e: any) {
    setCurrentLocation(e.key);
  }

  const items: MenuItem[] = [
    getItem({
      label: 'Главная',
      key: '/',
      icon: <HomeOutlined />,
      onClick: () => navigate('/'),
    }),
    getItem({
      label: 'Меню',
      key: 'submenu',
      icon: <UserOutlined />,
      children: [
        getItem({
          label: 'Мои прогнозы',
          key: '/forecasts',
          onClick: () => navigate('/forecasts'),
        }),
        getItem({
          label: 'Создать прогноз',
          key: '/create',
          onClick: () => navigate('/create'),
        }),
        getItem({
          label: 'Инструкции',
          key: '/instructions',
          onClick: () => navigate('/instructions'),
        }),
        getItem({
          label: 'Настройки',
          key: '/settings',
          onClick: () => navigate('/settings'),
        }),
      ],
    }),
    getItem({
      label: 'Выйти',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => logoutUser(),
    }),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={media ? true : collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      >
        <GreyContent />
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['submenu']}
          items={items}
          onClick={handleClickOnLocation}
          selectedKeys={[currentLocation]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          ProphetRu ©2023 Created by BulaDev
        </Footer>
      </Layout>
    </Layout>
  );
};
