import React, { useContext } from 'react';
import { Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';

import styles from './Contacts.module.scss';

const { Title, Text, Paragraph } = Typography;

export const Contacts = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Наши контакты'}</Title>
    </div>
  );
};
