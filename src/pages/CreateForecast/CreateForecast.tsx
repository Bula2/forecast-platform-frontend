import React, { useState } from 'react';
import { Col, Divider, Row, Typography, message, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

import styles from './CreateForecast.module.scss';
import Dragger from 'antd/es/upload/Dragger';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const [data, setData] = useState<any>(null);

  const transpose = (matrix: any[]) =>
    matrix[0].map((_: any, colIndex: any) =>
      matrix.map((row) => row[colIndex])
    );

  const checkFileType = (file: any) => {
    const isXLSX =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isCSV = file.type === 'text/csv';
    if (!isXLSX && !isCSV) {
      message.error('Можно загружать только файлы в формате XLSX или CSV');
      return false;
    }
    return true;
  };

  const processData = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const content = e.target.result;
      if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        const workbook = XLSX.read(content, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const formattedData = transpose(
          excelData.map((row: any) => Object.values(row))
        );
        setData(formattedData);
      } else if (file.type === 'text/csv') {
        Papa.parse(content, {
          header: true,
          dynamicTyping: true,
          complete: (result: any) => {
            const formattedData = transpose(
              result.data.map((row: any) => Object.values(row))
            );
            setData(formattedData);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      }
    };

    reader.readAsBinaryString(file);
  };

  const customRequest = ({ file, onSuccess }: any) => {
    if (checkFileType(file)) {
      processData(file);
      onSuccess();
    }
  };

  const onRemove = () => {
    setData(null);
  };

  console.log(data);

  return (
    <div>
      <Title level={3} className={styles.title}>
        {'Создание прогноза'}
      </Title>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Upload.Dragger
            customRequest={customRequest}
            maxCount={1}
            showUploadList={{
              showRemoveIcon: true,
              showDownloadIcon: false,
              showPreviewIcon: true,
            }}
            beforeUpload={(file) => {
              if (!checkFileType(file)) {
                return false;
              }
              // Заменяем текущий файл на новый
              setData(null);
              return true;
            }}
            onRemove={onRemove}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Кликните или перетащите файл сюда для загрузки
            </p>
            <p className="ant-upload-hint">
              Поддерживаются только файлы в формате XLSX или CSV
            </p>
          </Upload.Dragger>
        </Col>
      </Row>
    </div>
  );
};
