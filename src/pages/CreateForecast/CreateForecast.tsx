import { Button, Form, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { MyUploader } from './components/Uploader/MyUploader';

import axios from 'axios';
import styles from './CreateForecast.module.scss';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const onFinish = async (values: any) => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/file/add/',
        { file: values.file[0].originFileObj },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      message.success(`Прогноз создан!`);
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <Form name="forecast" onFinish={onFinish}>
      <div>
        <Title level={3}>{'Создание прогноза'}</Title>
        <Text className={styles.linkInstructions}>
          {'Перед создание прогноза ознакомьтесь с '}
          <Link to="/instructions">{'Инструкцией'}</Link>
        </Text>
        <MyUploader />
        <Form.Item style={{ marginTop: 50 }}>
          <Button type="primary" htmlType="submit">
            {'Создать прогноз'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
