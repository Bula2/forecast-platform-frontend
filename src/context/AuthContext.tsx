import React, { PropsWithChildren } from 'react';
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IAuthUser } from '../types/userTypes';
import { useNavigate } from 'react-router-dom';
import { getNotesApi, loginUserApi, updateUserTokensApi } from '../api/api';

interface IAuthContext {
  loginUser: (value: IAuthUser) => Promise<string>;
  user: any;
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
  const [user, setUser] = useState<any>(() =>
    localStorageuserValue
      ? jwtDecode(localStorageuserValue.access as string)
      : null
  );

  const loginUser = async (values: IAuthUser) => {
    try {
      const responce = await loginUserApi({
        username: values.username,
        password: values.password,
      });
      const data = responce.data;
      const currentUser = jwtDecode(data.access as string);
      setAuthTokens(data);
      setUser(currentUser);
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
      return 'success';
    } catch (e) {
      console.log(e);
      return 'error';
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
      setUser(currentUser);
      localStorage.setItem('authTokens', JSON.stringify(data));
    } catch (e) {
      logoutUser();
      console.log(e);
    }
  };

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
      console.log(e);
    }
  };

  const contextData = { user, loginUser, logoutUser, getNotes };

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
