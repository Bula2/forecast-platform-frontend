import { RefObject } from 'react';
import { DataTableType } from '../types';
import format from 'date-fns/format';
import * as FileSaver from 'file-saver';
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';

// Скачивание данных таблицы в XLSX
interface DownloadExcel {
  dataForExcel: object[];
  fileName: string;
}

export const downloadExcel = ({
  dataForExcel,
  fileName = 'Forecast',
}: DownloadExcel) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(dataForExcel);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(
    data,
    //@ts-ignore
    `${fileName}_${format(new Date(), 'yyyy.MM.dd HH-mm-ss')}${fileExtension}`
  );
};

// Скачивание png
interface DownloadPng {
  ref: RefObject<HTMLDivElement>;
  setIsLoading: (value: boolean) => void;
}

export const downloadPng = ({ ref, setIsLoading }: DownloadPng) => {
  if (!ref.current) {
    return;
  }

  setIsLoading(true);
  toPng(ref.current, { cacheBust: true })
    .then((dataUrl) => {
      const getFileName = (fileType: string) =>
        //@ts-ignore
        `${format(new Date(), "'Forecast-'HH-mm-ss")}.${fileType}`;
      const link = document.createElement('a');
      link.download = `${getFileName('png')}`;
      link.href = dataUrl;
      link.click();
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

interface GetTableSource {
  dimensions?: string[];
  measures: number[];
  forecast_measures: number[];
}

export const getTableSource = ({
  dimensions,
  measures,
  forecast_measures,
}: GetTableSource): DataTableType[] => {
  if (!measures || !forecast_measures) {
    return [];
  }
  const currentDimensions = dimensions
    ? [
        ...dimensions,
        ...forecast_measures.map(
          (_, index) => `Период №${dimensions.length + index + 1}`
        ),
      ]
    : [...measures, ...forecast_measures].map(
        (_, index) => `Период №${index + 1}`
      );

  const currentMeasures = measures.map((item) => {
    return {
      type: 'downloaded',
      value: item,
    };
  });

  const currentForecastMeasures = forecast_measures?.map((item) => {
    return {
      type: 'forecast',
      value: item,
    };
  });

  const concatenatedMeasures = [...currentMeasures, ...currentForecastMeasures];

  const dataSource = currentDimensions.map((item, index) => {
    return {
      key: index + 1,
      dataDimensions: item,
      dataType:
        concatenatedMeasures[index].type === 'downloaded'
          ? 'Загруженное значение'
          : 'Спрогнозированное значение',
      dataMeasures: concatenatedMeasures[index],
    };
  });
  return dataSource;
};
