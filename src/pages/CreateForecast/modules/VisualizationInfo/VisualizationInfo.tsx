import React, { useState } from 'react';

import {
  Checkbox,
  ColorPicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';

import styles from './VisualizationInfo.module.scss';

export const VisualizationInfo = () => {
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Divider className={styles.divider} orientation="left">
        {'Выберите параметры визуализации'}
      </Divider>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_item}>
          <Form.Item
            label="Тип визуализации"
            name="visualization_type"
            rules={[{ required: true, message: 'Выберите тип визуализации' }]}
          >
            <Select
              showSearch
              placeholder="Тип визуализации"
              optionFilterProp="children"
              className={styles.input}
              filterOption={filterOption}
              options={[
                {
                  label: 'Линейная диаграмма',
                  value: 'linechart',
                },
                {
                  label: 'Точечная диаграмма',
                  value: 'scatterchart',
                },
                {
                  label: 'Столбчатая диаграмма',
                  value: 'barchart',
                },
                {
                  label: 'Диаграмма с областями',
                  value: 'areachart',
                },
              ]}
            />
          </Form.Item>
          <MyTooltip
            title="Выберите тип визуализации, который будет построен"
            color="geekblue"
            placement="right"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_item}>
          <Form.Item
            name="color"
            label="Цвет визуализации"
            rules={[{ required: true, message: 'Выберите цвет визуализации' }]}
          >
            <ColorPicker size="large" showText />
          </Form.Item>
          <MyTooltip
            title="Выберите цвет визуализации, которая будет построена"
            color="geekblue"
            placement="right"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_item}>
          <Form.Item label="Юнит" name="unit">
            <Input
              size="middle"
              className={styles.input}
              count={{
                show: true,
                max: 15,
              }}
            />
          </Form.Item>
          <MyTooltip
            title="Введите юнит - мера в которой будут измеряться значения данных (например: руб.)"
            color="geekblue"
            placement="right"
          />
        </div>
      </div>
    </>
  );
};
