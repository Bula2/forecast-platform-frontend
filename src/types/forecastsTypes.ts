export interface CreateForecastType {
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

export interface AllForecasts {
  result_id: string;
  title: string;
  subtitle: string;
  user: string;
  dataset: string;
  forecast: string;
  visualization: string;
}

export interface CurrentForecast {
  result_id: number;
  dataset: {
    dataset_id: number;
    dimensions?: string[];
    measures: number[];
  };
  forecast: {
    forecast_id: number;
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
