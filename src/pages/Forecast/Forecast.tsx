import React, { useContext, useEffect } from 'react';
import { Button, Divider, List, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Forecast.module.scss';
import { ForecastContext } from '../../context';

const { Title, Text, Paragraph } = Typography;

export const Forecast = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { allForecasts, currentForecast, getCurrentForecast } =
    useContext(ForecastContext);

  useEffect(() => {
    getCurrentForecast(Number(params.id));
  }, []);

  const handleClickButtonBack = () => {
    navigate('/forecasts');
  };

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{currentForecast?.title}</Title>
      <Button
        type="primary"
        onClick={handleClickButtonBack}
        className={styles.buttonBack}
        icon={<ArrowLeftOutlined />}
      >
        {'Назад'}
      </Button>
    </div>
  );
};
