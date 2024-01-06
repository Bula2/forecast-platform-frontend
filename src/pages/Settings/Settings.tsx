import React, { useContext } from 'react';
import { Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';

import styles from './Settings.module.scss';

const { Title, Text, Paragraph } = Typography;

export const Settings = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Настройки'}</Title>
    </div>
  );
};
