import React from 'react';
import { Typography } from 'antd';

import styles from './Instructions.module.scss';

const { Title, Text, Paragraph } = Typography;

export const Instructions = () => {
  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Инструкции'}</Title>
    </div>
  );
};
