export interface ICommonChartParams {
  marker: string;
  seriesName: string;
  value: number;
  percent: number;
  name: string;
  dataIndex: number;
  seriesIndex: number;
}

export interface ICommonChartTooltipSize {
  contentSize: number[];
  viewSize: number[];
}

export interface ICommonChartSize {
  min: number;
  max: number;
}

export interface ICommonChartEventParams {
  type: string;
  name: string;
  selected: ICommonChartSelected;
}

interface ICommonChartSelected {
  [key: string]: boolean;
}

export interface ICommonChartOption {
  series: ICommonChartSeries[];
}

interface ICommonChartSeries {
  markPoint: ICommonChartMarkPointData;
}

interface ICommonChartMarkPointData {
  data: {
    name: number;
  }[];
}
