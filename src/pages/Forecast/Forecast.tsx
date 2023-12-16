import React from 'react';
import { useParams } from 'react-router-dom';

export const Forecast = () => {
  const params = useParams();
  return <div>Forecast номер {params.id}</div>;
};
