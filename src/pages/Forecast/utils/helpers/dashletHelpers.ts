import { ICommonChartParams } from '../../../../types/chartParamsTypes';
import styles from '../../Forecast.module.scss';

interface GetLineChartOptions {
  dimensions?: string[];
  measures: number[];
  forecast_measures: number[];
  color: string;
  unit?: string;
  isLegendClicked: boolean;
}

export const getLineChartOptions = ({
  dimensions,
  measures,
  forecast_measures,
  color,
  unit,
  isLegendClicked,
}: GetLineChartOptions) => {
  const chartDimensions = dimensions
    ? [
        ...dimensions,
        ...forecast_measures.map(
          (_, index) => `Период №${dimensions.length + index + 1}`
        ),
      ]
    : [...measures, ...forecast_measures].map(
        (_, index) => `Период №${index + 1}`
      );

  const nullArray = measures.map((_) => null);

  return {
    tooltip: {
      confine: true,
      show: true,
      trigger: 'axis',
      position: 'inside',
      axisPointer: {
        type: 'line',
      },
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      formatter(params: ICommonChartParams[]) {
        let series = '';

        for (let i = 0; i < params.length; i++) {
          if (
            (params[i].seriesName === 'Спрогнозированные данные' &&
              params[i].value === undefined) ||
            (params[i].seriesName === 'Загруженные данные' &&
              params[i].dataIndex === measures.length)
          ) {
            series += '';
          } else
            series += `
              <div class = ${styles.tooltip__series}> 
                <div class = ${styles.tooltip__name}>
                  ${params[i].marker} ${params[i].seriesName}
                </div>
               <div class = ${styles.tooltip__value}>
                ${params[i].value} ${unit || ''} 
                </div>
              </div>
              `;
        }

        return `
              <div class = ${styles.tooltip}>
                  <div class = ${styles.tooltip__title}> 
                  ${params[0].name} 
                  </div>
                  ${series}
              </div> 
            `;
      },
    },
    legend: {
      show: true,
      data: ['Загруженные данные', 'Спрогнозированные данные'],
      icon: 'circle',
      bottom: 15,
      itemGap: 30,
      lineStyle: {
        opacity: 0,
      },
      textStyle: {
        color: 'black',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      height: '75%',
      containLabel: true,
    },
    xAxis: {
      show: true,
      type: 'category',
      boundaryGap: false,
      data: chartDimensions,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'gray',
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: 'gray',
        },
      },
      axisLabel: {
        show: true,
        color: 'black',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        offset: 27,
        axisLabel: {
          show: true,
          color: 'black',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 12,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'black',
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: 'black',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
        bottom: '10%',
        height: 24,
      },
    ],
    series: [
      {
        name: 'Загруженные данные',
        type: 'line',
        smooth: true,
        data: isLegendClicked ? measures : [...measures, forecast_measures[0]],
        color: color,
      },
      {
        name: 'Спрогнозированные данные',
        color: '#31e831',
        type: 'line',
        data: [...nullArray, ...forecast_measures],
      },
    ],
  };
};
