import { Alert, Button, Form, Space, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import styles from './CreateForecast.module.scss';
import { CreateForecastType } from '../../types/forecastsTypes';
import { useContext, useState } from 'react';
import {
  CommonInfo,
  ForecastInfo,
  MyUploader,
  VisualizationInfo,
} from './modules';
import { MyLoader } from '../../components/MyLoader/MyLoader';
import { createForecastApi } from '../../api';
import { AuthContext, ForecastContext } from '../../context';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const { user } = useContext(AuthContext);
  const { createForecast } = useContext(ForecastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: CreateForecastType) => {
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
    const responce = await createForecast(requestData);
    if (responce.type === 'success') {
      const result_id = responce?.value.result_id;
      message.success(`Прогноз создан!`);
      setIsLoading(false);
      navigate(`/forecast/${result_id}`);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };
  return isLoading ? (
    <div className={styles.loadingWrapper}>
      <MyLoader color="#1677FF" size={56} />
    </div>
  ) : (
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
        ['visualization_type']: 'linechart',
        ['color']: '#2b6ac2',
      }}
    >
      <div className={styles.wrapper}>
        <Title level={3}>{'Создание прогноза'}</Title>
        <Text className={styles.linkInstructions}>
          {'Перед создание прогноза ознакомьтесь с '}
          <Link to="/instructions">{'Инструкциями'}</Link>
        </Text>
        <MyUploader />
        <CommonInfo />
        <ForecastInfo />
        <VisualizationInfo />
        <Form.Item className={styles.buttonWrapper}>
          <Button type="primary" htmlType="submit" size="large">
            {'Создать прогноз'}
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
