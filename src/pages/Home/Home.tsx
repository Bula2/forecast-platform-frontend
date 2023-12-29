import { Divider, List, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import { fastMenuItems } from './utils/constants';

const { Title, Text, Paragraph } = Typography;

export const Home = () => {
  const { user, getNotes } = useContext(AuthContext);
  // useEffect(() => {
  //   getCurrentNotes();
  // }, []);

  // const getCurrentNotes = async () => {
  //   const currentNotes = await getNotes();
  //   setNotes(currentNotes);
  // };

  return (
    <div>
      <Title level={3}>
        {user && `Добро пожаловать, ${user.first_name || user.email}!`}
      </Title>
      <Divider orientation="left"></Divider>
      <Paragraph className={styles.paragraph}>
        {
          'Вас приветствует ProhetRu - универсальная система прогнозирования динамических показателей, представленных в виде временного ряда.'
        }
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        {'Для полноценной работы с системой - Авторизуйтесь!'}
      </Paragraph>
      <List
        size="large"
        header={
          <Text strong className={styles.menu__title}>
            Быстрое меню
          </Text>
        }
        bordered
        dataSource={fastMenuItems}
        renderItem={(item) => (
          <List.Item>
            <Text className={styles.link}>
              <Link to={item.link}>{item.text}</Link>
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
};
