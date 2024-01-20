import React from 'react';
import { CurrentForecast } from '../../../../types';
import { Table, TableProps, Tag, Typography } from 'antd';

import styles from './ForecastTable.module.scss';
import { getTableSource } from '../../utils/helpers';
import { DataTableType } from '../../utils/types';

interface Props {
  currentForecast: CurrentForecast;
}

const { Title, Text, Paragraph } = Typography;

export const ForecastTable: React.FC<Props> = ({ currentForecast }) => {
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
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Период',
      dataIndex: 'dataDimensions',
      key: 'dataDimensions',
      sorter: (a, b) => a.key - b.key,
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
      filters: [
        {
          text: 'Загруженное значение',
          value: 'Загруженное значение',
        },
        {
          text: 'Спрогнозированное значение',
          value: 'Спрогнозированное значение',
        },
      ],
      onFilter: (value: any, record) => record.dataType.indexOf(value) === 0,
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
      sorter: (a, b) => a.dataMeasures.value - b.dataMeasures.value,
    },
  ];

  return (
    <div className={styles.table}>
      <Table
        dataSource={dataTableSource}
        columns={columns}
        bordered={true}
        scroll={{ x: 1200, y: 400 }}
        pagination={false}
      />
    </div>
  );
};
