import React, { useState } from 'react';
import { DashletLayout } from '../../../../components/DashletLayout/DashletLayout';
import {
  ILegendselectchangedParams,
  ReactECharts,
} from '../../../../components/ReactECharts/ReactECharts';
import { CurrentForecast } from '../../../../types';

import styles from './ForecastDashlet.module.scss';
import { getLineChartOptions } from '../../utils/helpers/dashletHelpers';

interface Props {
  currentForecast: CurrentForecast;
}

export const ForecastDashlet: React.FC<Props> = ({ currentForecast }) => {
  const [isLegendClicked, setIsLegendClicked] = useState(false);
  const option = Object.keys(currentForecast).length
    ? getLineChartOptions({
        dimensions: currentForecast.excel_dataset?.dimensions,
        measures: currentForecast.excel_dataset.measures,
        forecast_measures: currentForecast.arima_forecast.forecast_measures,
        color: currentForecast.visualization.color,
        unit: currentForecast.visualization?.unit,
        isLegendClicked,
      })
    : {};

  const onEvents = {
    type: 'legendselectchanged',
    func: (params: ILegendselectchangedParams) => {
      params.selected['Спрогнозированные данные'] === false
        ? setIsLegendClicked(true)
        : setIsLegendClicked(false);
    },
  };
  return (
    <DashletLayout>
      <ReactECharts option={option} onEvents={onEvents} />
    </DashletLayout>
  );
};
