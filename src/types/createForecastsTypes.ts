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
