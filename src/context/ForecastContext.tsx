import { createContext, useState, useContext } from 'react';
import {
  AllForecasts,
  CreateForecastType,
  CurrentForecast,
  ResponceAnswerType,
} from '../types';
import {
  createForecastApi,
  getAllForecastsApi,
  getCurrentForecastApi,
} from '../api';
import { AuthContext } from './AuthContext';

interface IForecastContext {
  allForecasts: AllForecasts[];
  currentForecast: CurrentForecast;
  createForecast: (
    requestData: CreateForecastType
  ) => Promise<ResponceAnswerType>;
  getAllForecasts: () => Promise<ResponceAnswerType>;
  getCurrentForecast: (result_id: number) => Promise<ResponceAnswerType>;
}

export const ForecastContext = createContext({} as IForecastContext);

export const ForecastProvider = ({ children }: any) => {
  const { user, logoutUser } = useContext(AuthContext);

  const localStorageUserValue = JSON.parse(localStorage.getItem('authTokens')!);

  const [allForecasts, setAllForecasts] = useState<AllForecasts[]>([]);
  const [currentForecast, setCurrentForecast] = useState<CurrentForecast>(
    {} as CurrentForecast
  );

  const createForecast = async (requestData: CreateForecastType) => {
    try {
      const responce = await createForecastApi({
        ...requestData,
        access: localStorageUserValue.access,
      });
      return { type: 'success', value: responce.data };
    } catch (e) {
      logoutUser();
      return { type: 'error' };
    }
  };

  const getAllForecasts = async () => {
    try {
      const responce = await getAllForecastsApi({
        user_id: user?.user_id!,
        access: localStorageUserValue.access,
      });
      setAllForecasts(responce.data);
      return { type: 'success' };
    } catch (e) {
      logoutUser();
      return { type: 'error' };
    }
  };

  const getCurrentForecast = async (result_id: number) => {
    try {
      const responce = await getCurrentForecastApi({
        user_id: user?.user_id!,
        result_id,
        access: localStorageUserValue.access,
      });
      setCurrentForecast(responce.data[0]);
      return { type: 'success' };
    } catch (e) {
      logoutUser();
      return { type: 'error' };
    }
  };

  const contextData = {
    allForecasts,
    currentForecast,
    createForecast,
    getAllForecasts,
    getCurrentForecast,
  };

  return (
    <ForecastContext.Provider value={contextData}>
      {children}
    </ForecastContext.Provider>
  );
};
