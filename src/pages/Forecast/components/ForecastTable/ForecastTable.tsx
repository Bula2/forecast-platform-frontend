import React, { useState } from 'react';
import { CurrentForecast } from '../../../../types';
import {
  Button,
  Modal,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import styles from './ForecastTable.module.scss';
import { downloadExcel, getTableSource } from '../../utils/helpers';
import { DataTableType } from '../../utils/types';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

interface Props {
  currentForecast: CurrentForecast;
}

const { Title, Text, Paragraph } = Typography;

export const ForecastTable: React.FC<Props> = ({ currentForecast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataTableSource = Object.keys(currentForecast).length
    ? getTableSource({
        dimensions: currentForecast?.dimensions,
        measures: currentForecast.measures,
        forecast_measures: currentForecast.forecast_measures,
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
      <div className={styles.header}>
        <div className={styles.header__buttons}>
          <Tooltip title="Скачать xlsx">
            <Button
              shape="circle"
              icon={<DownloadOutlined />}
              onClick={() => downloadExcel({ dataForExcel: dataTableSource })}
            />
          </Tooltip>
          <Tooltip title="Раскрыть">
            <Button
              shape="circle"
              icon={<FullscreenOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </div>
      <Table
        dataSource={dataTableSource}
        columns={columns}
        bordered={true}
        scroll={{ x: 1200, y: 400 }}
        pagination={false}
      />
      <Modal
        title={currentForecast.title}
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={
          <Tooltip title="Свернуть">
            <FullscreenExitOutlined />
          </Tooltip>
        }
        centered
        width={'80%'}
        footer={null}
      >
        <Table
          dataSource={dataTableSource}
          columns={columns}
          bordered={true}
          scroll={{ x: 1200, y: 900 }}
          pagination={false}
        />
      </Modal>
    </div>
  );
};
