import React from 'react';
import { Link } from 'react-router-dom';

export const MyForectasts = () => {
  return (
    <div>
      Прогноз номер один вот тут: <Link to={'/forecast/5'}>{'Перейти'}</Link>
    </div>
  );
};
