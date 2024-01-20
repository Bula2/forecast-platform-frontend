import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Forecast.module.scss';
import { ForecastContext } from '../../context';
import { MyLoader } from '../../components/MyLoader/MyLoader';
import { ForecastDashlet, ForecastTable } from './components';

const { Title, Text, Paragraph } = Typography;

export const Forecast = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentForecast, getCurrentForecast } = useContext(ForecastContext);

  useEffect(() => {
    getCurrentForecast(Number(params.id));
  }, []);

  const handleClickButtonBack = () => {
    navigate('/forecasts');
  };

  if (!Object.keys(currentForecast).length) {
    return (
      <div className={styles.loading}>
        <MyLoader size={60} color="#1677FF" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <Title level={2}>{currentForecast.title}</Title>
          {currentForecast.subtitle && (
            <Title level={5}>{currentForecast.subtitle}</Title>
          )}
        </div>
        <Button
          type="primary"
          onClick={handleClickButtonBack}
          className={styles.header__button}
          icon={<ArrowLeftOutlined />}
        >
          {'Назад'}
        </Button>
      </div>
      <ForecastDashlet currentForecast={currentForecast} />
      <ForecastTable currentForecast={currentForecast} />
    </div>
  );
};
