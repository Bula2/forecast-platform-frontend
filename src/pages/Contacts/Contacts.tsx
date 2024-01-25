import React, { useContext } from 'react';
import { Space, Tag, Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';

import styles from './Contacts.module.scss';
import {
  EmailIcon,
  TelegramIcon,
  VkIcon,
} from '../../components/MyIcons/MyIcons';

const { Title, Text, Paragraph } = Typography;

export const Contacts = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Наши контакты'}</Title>
      <Title level={5}>
        {
          'Если у Вас возникли вопросы или предложения, свяжитесь с нами одним из следующих способов!'
        }
      </Title>
      <div className={styles.space}>
        <a href="https://t.me/s_niburu_1" target="_blank">
          <Tag className={styles.tag} icon={<TelegramIcon />} color="#039BE5">
            <Text className={styles.tag__text}>{'Telegram'}</Text>
          </Tag>
        </a>
        <a href="https://vk.com/dramaerr" target="_blank">
          <Tag className={styles.tag} icon={<VkIcon />} color="#2787F5">
            <Text className={styles.tag__text}>{'Вконтакте'}</Text>
          </Tag>
        </a>

        <Tag
          className={styles.tag}
          icon={<EmailIcon size={25} />}
          color="#2eb6ff"
        >
          <Text className={styles.tag__text}>
            {'Email: bulaev123da@gmail.com'}
          </Text>
        </Tag>
      </div>
    </div>
  );
};
