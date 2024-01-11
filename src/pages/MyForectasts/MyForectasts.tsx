import React, { useContext, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styles from './MyForectasts.module.scss';
import { ForecastContext } from '../../context';

const { Title, Text, Paragraph } = Typography;

export const MyForectasts = () => {
  const { allForecasts, getAllForecasts } = useContext(ForecastContext);

  useEffect(() => {
    getAllForecasts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Мои прогнозы'}</Title>
      {allForecasts.map((item) => (
        <Card title={item.title} bordered={false}>
          <Text>{item.subtitle}</Text>
          <Link to={`/forecast/${item.result_id}`}>{'Открыть полностью'}</Link>
        </Card>
      ))}
    </div>
  );
};
