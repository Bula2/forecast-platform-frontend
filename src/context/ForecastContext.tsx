import { createContext, useState, useContext } from 'react';
import {
  IAllForecasts,
  ICreateForecast,
  ICurrentForecast,
  IResponceAnswerType,
} from '../types';
import {
  createForecastApi,
  getAllForecastsApi,
  getCurrentForecastApi,
} from '../api';
import { AuthContext } from './AuthContext';

interface IForecastContext {
  allForecasts: IAllForecasts[];
  currentForecast: ICurrentForecast;
  createForecast: (
    requestData: ICreateForecast
  ) => Promise<IResponceAnswerType>;
  getAllForecasts: () => Promise<IResponceAnswerType>;
  getCurrentForecast: (result_id: number) => Promise<IResponceAnswerType>;
}

export const ForecastContext = createContext({} as IForecastContext);

export const ForecastProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  const localStorageUserValue = JSON.parse(localStorage.getItem('authTokens')!);

  const [allForecasts, setAllForecasts] = useState<IAllForecasts[]>([]);
  const [currentForecast, setCurrentForecast] = useState<ICurrentForecast>(
    {} as ICurrentForecast
  );

  const createForecast = async (requestData: ICreateForecast) => {
    try {
      const responce = await createForecastApi({
        ...requestData,
        access: localStorageUserValue.access,
      });
      return { type: 'success', value: responce.data };
    } catch (e) {
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
