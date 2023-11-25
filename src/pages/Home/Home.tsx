import { Layout } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const { Content } = Layout;

export const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Content style={{ margin: '16px' }}>
      {user && `Welcome, ${user.username}`}
    </Content>
  );
};
