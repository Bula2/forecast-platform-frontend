import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IAuthUser, IRegisterUser, IUser, IResponceAnswerType } from '../types';
import { useNavigate } from 'react-router-dom';
import {
  getNotesApi,
  loginUserApi,
  registerUserApi,
  updateUserTokensApi,
} from '../api/api';

interface IAuthContext {
  user: IUser | null;
  loginUser: (value: IAuthUser) => Promise<IResponceAnswerType>;
  registerUser: (value: IRegisterUser) => Promise<IResponceAnswerType>;
  logoutUser: () => void;
  getNotes: () => Promise<any[]>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const localStorageuserValue = JSON.parse(localStorage.getItem('authTokens')!);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorageuserValue ? localStorageuserValue : null
  );
  const [user, setUser] = useState<IUser | null>(() =>
    localStorageuserValue
      ? jwtDecode(localStorageuserValue.access as string)
      : null
  );

  const loginUser = async (values: IAuthUser) => {
    try {
      const responce = await loginUserApi({
        username: values.email,
        password: values.password,
      });
      const data = responce.data;
      const currentUser = jwtDecode(data.access as string);
      setAuthTokens(data);
      setUser(currentUser as any);
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
      return { type: 'success' };
    } catch (e) {
      return { type: 'error' };
    }
  };

  const registerUser = async (values: IRegisterUser) => {
    try {
      await registerUserApi({
        name: values?.name,
        email: values.email,
        password: values.password,
      });
      const newValues = { email: values.email, password: values.password };
      return loginUser(newValues);
    } catch (e: any) {
      return { type: 'error', value: e.response.data.detail };
    }
  };

  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const updateUserTokens = async () => {
    try {
      const responce = await updateUserTokensApi({
        refresh: localStorageuserValue.refresh as string,
      });
      const data = responce.data;
      const currentUser = jwtDecode(data.access as string);
      setAuthTokens(data);
      setUser(currentUser as any);
      localStorage.setItem('authTokens', JSON.stringify(data));
    } catch (e) {
      logoutUser();
    }
  };

  // Тестовый
  const getNotes = async () => {
    try {
      const responce = await getNotesApi({
        access: localStorageuserValue.access,
      });
      if (responce.status === 200) return responce.data;
      else if (responce.statusText === 'Unauthorized') {
        logoutUser();
      } else return [];
    } catch (e) {
      logoutUser();
    }
  };

  const contextData = { user, loginUser, logoutUser, getNotes, registerUser };

  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4; // Раз в 4 минуты
    const interval = setInterval(() => {
      if (authTokens) {
        updateUserTokens();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
