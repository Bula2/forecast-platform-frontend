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
}

export const createForecastApi = async (requestData: ICreateForecastApi) =>
  await instance.post('forecast/add/', requestData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Тестовый
interface IGetNotesApi {
  access: string;
}

export const getNotesApi = async ({ access }: IGetNotesApi) =>
  await instance.get('notes/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(access),
    },
  });
