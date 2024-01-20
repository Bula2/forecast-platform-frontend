import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  List,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Forecast.module.scss';
import { ForecastContext } from '../../context';
import { DashletLayout } from '../../components/DashletLayout/DashletLayout';
import { ReactECharts } from '../../components/ReactECharts/ReactECharts';
import { getTableSource } from './utils/helpers';
import { DataTableType } from './utils/types';
import { CurrentForecast } from '../../types';
import { MyLoader } from '../../components/MyLoader/MyLoader';

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

  const dataTableSource = Object.keys(currentForecast).length
    ? getTableSource({
        dimensions: currentForecast.excel_dataset?.dimensions,
        measures: currentForecast.excel_dataset.measures,
        forecast_measures: currentForecast.arima_forecast.forecast_measures,
      })
    : [];

  const columns: TableProps<DataTableType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Дата',
      dataIndex: 'dataDimensions',
      key: 'dataDimensions',
    },
    {
      title: 'Тип',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (item) => {
        const color = item === 'Загруженное значение' ? '#1677FF' : '#31e831';
        return (
          <Tag color={color} key={item}>
            {item.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: 'Значение',
      dataIndex: 'dataMeasures',
      key: 'dataMeasures',
      render: (item) => (
        <Text
          strong
          className={item.type === 'forecast' ? styles.table__forecast : ''}
        >
          {item.value}
        </Text>
      ),
    },
  ];

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
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
      <DashletLayout>
        <ReactECharts option={option} />
      </DashletLayout>
      <div className={styles.table}>
        <Table
          dataSource={dataTableSource}
          columns={columns}
          bordered={true}
          scroll={{ x: 1200, y: 400 }}
          pagination={false}
        />
      </div>
    </div>
  );
};
