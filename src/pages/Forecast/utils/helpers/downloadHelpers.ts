import { RefObject } from 'react';
import format from 'date-fns/format';
import * as FileSaver from 'file-saver';
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';
import { DataTableType } from '../types';

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

// Скачивание данных таблицы в XLSX
interface DownloadExcel {
  dataForExcel: DataTableType[];
  fileName?: string;
}
export const downloadExcel = ({
  dataForExcel,
  fileName = 'Forecast',
}: DownloadExcel) => {
  const rows = getDataForExcel(dataForExcel);
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(
    data,
    //@ts-ignore
    `${fileName}_${format(new Date(), 'yyyy.MM.dd HH-mm-ss')}${fileExtension}`
  );
};

export const getDataForExcel = (data: DataTableType[]) =>
  data.map((item) => {
    return {
      ['ID']: item.key,
      ['Период']: item.dataDimensions,
      ['Тип']: item.dataType,
      ['Значение']: item.dataMeasures.value,
    };
  }, []);
