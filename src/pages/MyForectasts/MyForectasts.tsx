import React, { useContext, useEffect } from 'react';
import { Card, Col, Row, Typography, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import styles from './MyForectasts.module.scss';
import { ForecastContext } from '../../context';
import { AllForecasts } from '../../types';
import { useMediaQuery } from '../../hooks';
import { allForecasts } from '../../api/mockApi';

const { Title, Text, Paragraph } = Typography;

export const MyForectasts = () => {
  const navigate = useNavigate();
  const media = useMediaQuery('(max-width: 1080px)');
  // const { allForecasts, getAllForecasts } = useContext(ForecastContext);

  // useEffect(() => {
  //   getAllForecasts();
  // }, []);

  const handleClick = (id: string) => {
    navigate(`/forecast/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Мои прогнозы'}</Title>
      <Row>
        {allForecasts.length === 0 && (
          <div className={styles.noForecasts}>
            <Title level={4}>{'Ни одного прогноза не создано('}</Title>
          </div>
        )}
        {allForecasts.map((item, index) => (
          <Col key={index} span={media ? 24 : 12}>
            <Card
              className={styles.card}
              title={
                <Text strong className={styles.card__title}>
                  {item.title}
                </Text>
              }
              bordered={false}
              onClick={() => handleClick(String(item.forecast_id))}
            >
              <div className={styles.content}>
                <div className={styles.content__leftBlock}>
                  <Text className={styles.content__subtitle}>
                    <Text strong>{'Описание: '}</Text>
                    {item.subtitle ?? 'Нету'}
                  </Text>
                </div>
                {!media ? (
                  <div className={styles.content__rigthBlock}>
                    <Image
                      width={60}
                      preview={false}
                      src="../../images/forecast-card.png"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
