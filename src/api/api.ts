import axios from 'axios';

const instance = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
});

interface ILoginUserApi {
  username: string;
  password: string;
}

export const loginUserApi = async ({ username, password }: ILoginUserApi) =>
  await instance.post('token/', {
    username,
    password,
  });

interface IUpdateUserTokensApi {
  refresh: string;
}

export const updateUserTokensApi = async ({ refresh }: IUpdateUserTokensApi) =>
  await instance.post('token/refresh/', {
    refresh,
  });

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
