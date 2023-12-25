import { Button, Divider, Form, Typography, message } from 'antd';
import { Link } from 'react-router-dom';

import axios from 'axios';
import styles from './CreateForecast.module.scss';
import { ICreateForecast } from '../../types/createForecastsTypes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CommonInfo, ForecastInfo, MyUploader } from './modules';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const { user } = useContext(AuthContext);
  const onFinish = async (values: ICreateForecast) => {
    console.log({
      user_id: user?.user_id,
      file: values.file[0].originFileObj,
      title: values.title,
      subtitle: values.subtitle,
      prognosis_type: values.prognosis_type,
    });
    // try {
    //   await axios.post(
    //     'http://127.0.0.1:8000/api/file/add/',
    //     { file: values.file[0].originFileObj },
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );
    //   message.success(`Прогноз создан!`);
    // } catch (e: any) {
    //   console.log(e);
    // }
  };
  return (
    <Form name="forecast" layout={'vertical'} onFinish={onFinish}>
      <div className={styles.wrapper}>
        <Title level={3}>{'Создание прогноза'}</Title>
        <Text className={styles.linkInstructions}>
          {'Перед создание прогноза ознакомьтесь с '}
          <Link to="/instructions">{'Инструкцией'}</Link>
        </Text>
        <MyUploader />
        <CommonInfo />
        <ForecastInfo />
        <Form.Item className={styles.buttonWrapper}>
          <Button type="primary" htmlType="submit">
            {'Создать прогноз'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
