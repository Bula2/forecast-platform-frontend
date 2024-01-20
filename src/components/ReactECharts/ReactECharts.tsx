import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { CSSProperties } from 'react';

import { forceResizeCharts } from './UtilsForCharts';

interface IOnEvents {
  type: string;
  func: Function;
}

export interface ReactEChartsProps {
  option: any;
  onEvents?: IOnEvents;
  style?: CSSProperties;
  settings?: echarts.SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  forceResize?: boolean;
}

export function ReactECharts({
  option,
  onEvents,
  style,
  settings,
  loading,
  theme,
  forceResize = true,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;

    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    let observer: MutationObserver | false | undefined = false;
    if (forceResize) observer = forceResizeCharts(resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
      chart?.on(onEvents?.type!, function (params: any) {
        onEvents?.func(params);
        chart?.setOption(option, settings);
      });
    }
  }, [option, settings, onEvents, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);

      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
  );
}

export interface ISeries {
  name: string;
  data: number[];
}

export interface ILegendselectchangedParams {
  name: string;
  selected: Record<string, boolean>;
  type: string;
}

export function sum(series: ISeries[], array: number[]) {
  let result = 0;

  for (let z = 0; z < series[0]?.data.length; z++) {
    for (let i = 0; i < series.length; i++) {
      result += series[i].data[z];
    }

    array.push(result);
    result = 0;
  }
}

export function sumForEvents(
  series: ISeries[],
  array: number[],
  params: ILegendselectchangedParams
) {
  let result = 0;

  for (let z = 0; z < series[0]?.data.length; z++) {
    for (let i = 0; i < series.length; i++) {
      if (params.selected[series[i].name]) result += series[i].data[z];
    }

    array.push(result);
    result = 0;
  }
}
