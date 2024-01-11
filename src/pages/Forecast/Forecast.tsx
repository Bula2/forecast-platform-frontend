import React, { useContext, useEffect } from 'react';
import { Divider, List, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import styles from './Forecast.module.scss';
import { ForecastContext } from '../../context';

const { Title, Text, Paragraph } = Typography;

export const Forecast = () => {
  const params = useParams();
  const { allForecasts, currentForecast, getCurrentForecast } =
    useContext(ForecastContext);

  useEffect(() => {
    getCurrentForecast(Number(params.id));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{currentForecast?.title}</Title>
    </div>
  );
};
