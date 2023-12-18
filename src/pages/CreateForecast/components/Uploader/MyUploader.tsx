import React, { useState } from 'react';
import { Typography, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const { Title, Text } = Typography;

interface IProps {
  uploadData: any[] | null;
  setUploadData: (data: any[] | null) => void;
}

export const MyUploader: React.FC<IProps> = ({ uploadData, setUploadData }) => {
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
        setUploadData(formattedData);
      } else if (file.type === 'text/csv') {
        Papa.parse(content, {
          header: true,
          dynamicTyping: true,
          complete: (result: any) => {
            const formattedData = transpose(
              result.data.map((row: any) => Object.values(row))
            );
            setUploadData(formattedData);
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
    setUploadData(null);
  };

  return (
    <div>
      <Title level={3}>{'Создание прогноза'}</Title>
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
          setUploadData(null);
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
    </div>
  );
};
