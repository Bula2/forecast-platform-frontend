import React, { useState } from 'react';
import { Col, Row, Typography, message, Upload } from 'antd';
import { MyUploader } from './components/Uploader/MyUploader';
import { Link } from 'react-router-dom';

import styles from './CreateForecast.module.scss';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  console.log(data);
  console.log(categories);
  return (
    <div>
      <Title level={3}>{'Создание прогноза'}</Title>
      <Text className={styles.linkInstructions}>
        {'Перед создание прогноза ознакомтесь с '}
        <Link to="/instructions">{'Инструкцией'}</Link>
      </Text>
      <MyUploader
        data={data}
        categories={categories}
        setData={setData}
        setCategories={setCategories}
      />
    </div>
  );
};
