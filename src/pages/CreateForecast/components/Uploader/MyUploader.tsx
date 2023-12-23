import { InboxOutlined } from '@ant-design/icons';
import { Form, Typography, Upload, message } from 'antd';
import React from 'react';

import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';
import styles from './MyUploader.module.scss';

const { Title, Text } = Typography;

interface IProps {}

export const MyUploader: React.FC<IProps> = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} загружен успешно!`);
    } else if (info.file.status === 'error') {
      message.error(`Не удалось загрузить ${info.file.name}`);
    }
  };

  const beforeUpload = (file: any) => {
    const isXLSX =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isCSV = file.type === 'text/csv';
    if (!isXLSX && !isCSV) {
      message.error('Можно загружать только файлы в формате XLSX или CSV');
    }
    return isXLSX || isCSV || Upload.LIST_IGNORE;
  };

  return (
    <div className={styles.wrapper}>
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Загрузите файл' }]}
        className={styles.dragger}
      >
        <Upload.Dragger
          name="file"
          action="https://run.mocky.io/v3/ef6e7e94-9207-42a6-8dfc-08e2288058b8" //mockApi from https://designer.mocky.io/
          maxCount={1}
          showUploadList={{
            showRemoveIcon: true,
            showDownloadIcon: false,
            showPreviewIcon: true,
          }}
          accept=".csv, .xlsx"
          beforeUpload={beforeUpload}
          onChange={onChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {'Кликните или перетащите файл сюда для загрузки'}
          </p>
          <p className="ant-upload-hint">
            {'Поддерживаются только файлы в формате XLSX или CSV'}
          </p>
        </Upload.Dragger>
      </Form.Item>
      <MyTooltip
        title="Загрузите датасет в формате XLSX или CSV в соотвествие с инструкцией"
        color="geekblue"
        placement="right"
      />
    </div>
  );
};
