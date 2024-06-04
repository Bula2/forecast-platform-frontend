import axios from 'axios';

const instance = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
});

// User requests

interface ILoginUserApi {
  username: string;
  password: string;
}

export const loginUserApi = async ({ username, password }: ILoginUserApi) =>
  await instance.post('token/', {
    username,
    password,
  });

interface IRegisterUserApi {
  name?: string;
  email: string;
  password: string;
}

export const registerUserApi = async ({
  name,
  email,
  password,
}: IRegisterUserApi) =>
  await instance.post('user/add/', {
    name,
    email,
    password,
  });

interface IUpdateUserTokensApi {
  refresh: string;
}

export const updateUserTokensApi = async ({ refresh }: IUpdateUserTokensApi) =>
  await instance.post('token/refresh/', {
    refresh,
  });

// Forecast requests

interface ICreateForecastApi {
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
  access: string;
}

export const createForecastApi = async (requestData: ICreateForecastApi) =>
  await instance.post('forecast/add/', requestData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + String(requestData.access),
    },
  });

interface IGetAllForecastsApii {
  user_id: number;
  access: string;
}

export const getAllForecastsApi = async ({
  user_id,
  access,
}: IGetAllForecastsApii) =>
  await instance.get('forecast/get/all/', {
    params: { user_id },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(access),
    },
  });

interface IGetCurrentForecastApi {
  forecast_id: number;
  access: string;
}

export const getCurrentForecastApi = async ({
  forecast_id,
  access,
}: IGetCurrentForecastApi) =>
  await instance.get('forecast/get/current/', {
    params: { forecast_id },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(access),
    },
  });

interface IDeleteCurrentForecastApi {
  forecast_id: number;
  access: string;
}

export const deleteCurrentForecastApi = async ({
  forecast_id,
  access,
}: IDeleteCurrentForecastApi) =>
  await instance.delete('forecast/delete/current/', {
    params: { forecast_id },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(access),
    },
  });
