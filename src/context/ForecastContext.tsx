import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreateForecast, IResponceAnswerType } from '../types';
import { createForecastApi } from '../api';

interface IForecastContext {
  createForecast: (value: ICreateForecast) => Promise<IResponceAnswerType>;
}

export const ForecastContext = createContext({} as IForecastContext);

export const ForecastProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const createForecast = async (requestData: ICreateForecast) => {
    try {
      await createForecastApi(requestData);
      return { type: 'success' };
    } catch (e) {
      return { type: 'error' };
    }
  };

  const contextData = { createForecast };

  return (
    <ForecastContext.Provider value={contextData}>
      {children}
    </ForecastContext.Provider>
  );
};
