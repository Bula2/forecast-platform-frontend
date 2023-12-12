import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

interface IProps {
  size?: number;
  color?: string;
}

export const MyLoader: React.FC<IProps> = ({ size, color }) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ color: color || 'white', fontSize: size || 24 }}
          spin
        />
      }
    />
  );
};
