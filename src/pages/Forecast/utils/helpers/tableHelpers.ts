import { DataTableType } from '../types';

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
          (_, index) => `Период № ${dimensions.length + index + 1}`
        ),
      ]
    : [...measures, ...forecast_measures].map(
        (_, index) => `Период № ${index + 1}`
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
