export interface ICreateForecast {
  file: any;
  title: string;
  subtitle?: string;
  prognosis_type: string;
  is_auto_params_forecast: boolean;
  p_value?: number;
  d_value?: number;
  q_value?: number;
  n_count: number;
  visualization_type: string;
  color: any;
  unit?: string;
}

export interface IAllForecasts {
  result_id: string;
  title: string;
  subtitle: string;
  user: string;
  excel_dataset: string;
  arima_forecast: string;
  visualization: string;
}

export interface ICurrentForecast {
  result_id: number;
  excel_dataset: {
    excel_dataset_id: number;
    dimensions?: string[];
    measures: number[];
  };
  arima_forecast: {
    arima_forecast_id: number;
    is_auto_params_forecast?: boolean;
    p_value: number;
    q_value: number;
    d_value: number;
    forecast_measures: number[];
    n_count: number;
  };
  visualization: {
    visualization_id: number;
    visualization_type: 'barchart' | 'linechart' | 'scatterchart' | 'areachart';
    color: string;
    unit?: string;
  };
  title: string;
  subtitle?: string;
  user: number; //user_id
}
