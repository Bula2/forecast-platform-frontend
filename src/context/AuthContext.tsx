import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'antd';
import { IAuthUser } from '../types/userTypes';

interface IAuthContext {
  loginUser: (value: IAuthUser) => Promise<string>;
  user: any;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [authTokens, setAuthTokens] = useState(null);

  const loginUser = async (values: IAuthUser) => {
    try {
      const responce = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: values.username,
        password: values.password,
      });

      const data = responce.data;
      setAuthTokens(data);
      const currentUser = jwtDecode(data.access as string);
      setUser(currentUser);
      return 'success';
    } catch (e) {
      console.log(e);
      return 'error';
    }
  };

  const contextData = { loginUser, user };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
