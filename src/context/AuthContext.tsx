import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'antd';
import { IAuthUser } from '../types/userTypes';
import { useNavigate } from 'react-router-dom';

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
  const [loading, setLoading] = useState(true);

  const loginUser = async (values: IAuthUser) => {
    try {
      const responce = await axios.post('http://127.0.0.1:8000/api/token/', {
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
      const responce = await axios.post(
        'http://127.0.0.1:8000/api/token/refresh/',
        { refresh: localStorageuserValue.refresh as string }
      );
      const data = responce.data;
      const currentUser = jwtDecode(data.access as string);
      setAuthTokens(data);
      setUser(currentUser);
      localStorage.setItem('authTokens', JSON.stringify(data));
    } catch (e) {
      logoutUser();
      console.log(e);
    }
    if (loading) {
      setLoading(false);
    }
  };

  const getNotes = async () => {
    const responce = await axios.get('http://127.0.0.1:8000/api/notes/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    });
    if (responce.status === 200) return responce.data;
    else if (responce.statusText === 'Unauthorized') {
      logoutUser();
    } else return [];
  };

  const contextData = { user, loginUser, logoutUser, getNotes };

  useEffect(() => {
    if (loading) {
      updateUserTokens();
    }
    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateUserTokens();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
