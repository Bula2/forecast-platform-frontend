import React from 'react';
import { Typography, message, Upload, Tooltip } from 'antd';
import { InboxOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

import styles from './MyUploader.module.scss';
import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';

const { Title, Text } = Typography;

interface IProps {
  data: number[];
  categories: string[];
  setData: (data: number[]) => void;
  setCategories: (data: string[]) => void;
}

export const MyUploader: React.FC<IProps> = ({
  data,
  setData,
  setCategories,
}) => {
  const transposeData = (matrix: any[]) =>
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
      try {
        const content = e.target.result;
        if (
          file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          const workbook = XLSX.read(content, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const formattedData = transposeData(excelData);
          setCategories(
            formattedData[0].slice(1).map((item: any) => item.toString())
          );
          setData(formattedData[1].slice(1).map((item: any) => Number(item)));
        } else if (file.type === 'text/csv') {
          Papa.parse(content, {
            header: true,
            dynamicTyping: true,
            complete: (result: any) => {
              const formattedData = transposeData(
                result.data.map((row: any) => Object.values(row))
              );
              setCategories(
                formattedData[0].slice(1).map((item: any) => item.toString())
              );
              setData(
                formattedData[1].slice(1).map((item: any) => Number(item))
              );
            },
            error: (error) => {
              message.error('Ошибка обработки CSV');
            },
          });
        }
      } catch (e) {
        message.error(
          'Ошибка обработки датасета.\nПопробуйте загрузить другой'
        );
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
    setData([]);
    setCategories([]);
  };

  return (
    <div className={styles.wrapper}>
      <Upload.Dragger
        className={styles.dragger}
        customRequest={customRequest}
        maxCount={1}
        showUploadList={
          data?.length
            ? {
                showRemoveIcon: true,
                showDownloadIcon: false,
                showPreviewIcon: true,
              }
            : false
        }
        beforeUpload={(file) => {
          if (!checkFileType(file)) {
            return false;
          }
          // Заменяем текущий файл на новый
          setData([]);
          setCategories([]);
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
      <MyTooltip
        title="Загрузите датасет в формате XLSX или CSV в соотвествие с инструкцией"
        color="geekblue"
        placement="right"
      />
    </div>
  );
};
