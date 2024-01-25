import React from 'react';
import Icon from '@ant-design/icons';

interface Props {
  size?: number;
}

export const TelegramIcon: React.FC<Props> = ({ size }) => {
  return (
    <Icon
      component={() => (
        <img style={{ width: size || 30 }} src="../../images/telegram.png" />
      )}
    />
  );
};

export const VkIcon: React.FC<Props> = ({ size }) => {
  return (
    <Icon
      component={() => (
        <img style={{ width: size || 30 }} src="../../images/vk.png" />
      )}
    />
  );
};

export const EmailIcon: React.FC<Props> = ({ size }) => {
  return (
    <Icon
      component={() => (
        <img style={{ width: size || 30 }} src="../../images/email.png" />
      )}
    />
  );
};
