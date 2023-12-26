import { Divider, List, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

const { Title, Text, Paragraph } = Typography;

export const Home = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const { user, getNotes } = useContext(AuthContext);
  useEffect(() => {
    getCurrentNotes();
  }, []);

  const getCurrentNotes = async () => {
    const currentNotes = await getNotes();
    setNotes(currentNotes);
  };
  return (
    <>
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
      <Text className={styles.link}>
        <Link to={'/create'}>{'Создать прогноз'}</Link>
      </Text>
      <Text className={styles.link}>
        <Link to={'/forecasts'}>{'Мои прогнозы'}</Link>
      </Text>
      <Text className={styles.link}>
        <Link to={'/instructions'}>{'Инструкции'}</Link>
      </Text>
    </>
  );
};
