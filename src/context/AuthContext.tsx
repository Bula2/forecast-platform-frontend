import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthUser, RegisterUser, User, ResponceAnswerType } from '../types';
import { useNavigate } from 'react-router-dom';
import { loginUserApi, registerUserApi, updateUserTokensApi } from '../api';
import { currentUser } from '../api/mockApi';

interface IAuthContext {
  user: User | null;
  loginUser: (values: AuthUser) => void;
  // registerUser: (values: RegisterUser) => Promise<ResponceAnswerType>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const localStorageUserValue = JSON.parse(localStorage.getItem('authTokens')!);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorageUserValue ? localStorageUserValue : null
  );
  const [user, setUser] = useState<User | null>(currentUser);

  const loginUser = async (values: AuthUser) => {
    navigate('/');
    // try {
    // const responce = await loginUserApi({
    //   username: values.email,
    //   password: values.password,
    // });
    // const data = responce.data;
    // const currentUser = jwtDecode(data.access as string);
    // console.log('DATA: ', data);
    // console.log('currentUser: ', currentUser);
    // setAuthTokens(data);
    // setUser(currentUser as any);
    // localStorage.setItem('authTokens', JSON.stringify(data));
    //   navigate('/');
    //   return { type: 'success' };
    // } catch (e) {
    //   return { type: 'error' };
    // }
  };

  // const registerUser = async (values: RegisterUser) => {
  //   try {
  //     await registerUserApi({
  //       name: values?.name,
  //       email: values.email,
  //       password: values.password,
  //     });
  //     const newValues = { email: values.email, password: values.password };
  //     return loginUser(newValues);
  //   } catch (e: any) {
  //     return { type: 'error', value: e.response.data.detail };
  //   }
  // };

  const logoutUser = () => {
    // setUser(null);
    // setAuthTokens(null);
    // localStorage.removeItem('authTokens');
    navigate('/login');
  };

  // const updateUserTokens = async () => {
  //   try {
  //     const responce = await updateUserTokensApi({
  //       refresh: localStorageUserValue.refresh as string,
  //     });
  //     const data = responce.data;
  //     const currentUser = jwtDecode(data.access as string);
  //     setAuthTokens(data);
  //     setUser(currentUser as any);
  //     localStorage.setItem('authTokens', JSON.stringify(data));
  //   } catch (e) {
  //     logoutUser();
  //   }
  // };

  // useEffect(() => {
  //   const fourMinutes = 1000 * 60 * 4; // Раз в 4 минуты
  //   const interval = setInterval(() => {
  //     if (authTokens) {
  //       updateUserTokens();
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // }, [authTokens]);

  const contextData = {
    user,
    loginUser,
    logoutUser,
    // registerUser
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
