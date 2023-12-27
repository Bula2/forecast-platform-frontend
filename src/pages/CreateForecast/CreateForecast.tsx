import { Alert, Button, Divider, Form, Space, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import styles from './CreateForecast.module.scss';
import { ICreateForecast } from '../../types/createForecastsTypes';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  CommonInfo,
  ForecastInfo,
  MyUploader,
  VisualizationInfo,
} from './modules';
import { MyLoader } from '../../components/MyLoader/MyLoader';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: ICreateForecast) => {
    const requestData = {
      user_id: user?.user_id,
      file: values.file[0].originFileObj,
      title: values.title,
      subtitle: values.subtitle,
      prognosis_type: values.prognosis_type,
      is_auto_params_forecast: values.is_auto_params_forecast,
      p_value: values.p_value,
      d_value: values.d_value,
      q_value: values.q_value,
      n_count: values.n_count,
      visualization_type: values.visualization_type,
      color:
        values.color === '#2b6ac2' ? '#2b6ac2' : values.color.toHexString(),
      unit: values.unit,
    };
    setIsError(false);
    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/forecast/add/', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success(`Прогноз создан!`);
      setIsLoading(false);
      // navigate('/forecasts');
    } catch (e: any) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  return (
    <Form
      name="forecast"
      layout={'vertical'}
      onFinish={onFinish}
      initialValues={{
        ['prognosis_type']: 'arima',
        ['is_auto_params_forecast']: false,
        ['p_value']: 0,
        ['d_value']: 0,
        ['q_value']: 0,
        ['n_count']: 3,
        ['visualization_type']: 'barchart',
        ['color']: '#2b6ac2',
      }}
    >
      <div className={styles.wrapper}>
        <Title level={3}>{'Создание прогноза'}</Title>
        <Text className={styles.linkInstructions}>
          {'Перед создание прогноза ознакомьтесь с '}
          <Link to="/instructions">{'Инструкцией'}</Link>
        </Text>
        <MyUploader />
        <CommonInfo />
        <ForecastInfo />
        <VisualizationInfo />
        <Form.Item className={styles.buttonWrapper}>
          <Button type="primary" htmlType="submit" size="large">
            {isLoading ? <MyLoader /> : 'Создать прогноз'}
          </Button>
        </Form.Item>
        {isError && (
          <Space direction="vertical" className={styles.alert}>
            <Alert
              message="Ошибка создания прогноза - попробуйте снова!"
              type="error"
              showIcon
              closable
              onClose={() => setIsError(false)}
            />
          </Space>
        )}
      </div>
    </Form>
  );
};
