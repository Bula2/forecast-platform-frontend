import React from 'react';

import { Divider, Form, Input } from 'antd';
import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';

import styles from './CommonInfo.module.scss';

export const CommonInfo = () => {
  return (
    <>
      <Divider orientation="left" className={styles.divider}>
        {'Введите общую информацию о создаваемом прогнозе'}
      </Divider>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_item}>
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: 'Введите название прогноза' }]}
          >
            <Input
              size="middle"
              className={styles.input}
              count={{
                show: true,
                max: 50,
              }}
            />
          </Form.Item>
          <MyTooltip
            title="Введите название прогноза"
            color="geekblue"
            placement="right"
          />
        </div>
        <div className={styles.wrapper_item}>
          <Form.Item label="Описание" name="subtitle">
            <Input
              size="middle"
              className={styles.input}
              count={{
                show: true,
                max: 200,
              }}
            />
          </Form.Item>
          <MyTooltip
            title="Введите описание прогноза, если это необходимо"
            color="geekblue"
            placement="right"
          />
        </div>
      </div>
    </>
  );
};
