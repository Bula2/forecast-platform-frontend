import React, { useState } from 'react';

import { Checkbox, Divider, Form, Input, InputNumber, Select } from 'antd';
import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';

import styles from './ForecastInfo.module.scss';

export const ForecastInfo = () => {
  const [isAutoParams, setIsAutoParams] = useState<boolean>(false);

  const handleCheckboxClick = () => setIsAutoParams(!isAutoParams);
  return (
    <>
      <Divider className={styles.divider} orientation="left">
        {'Выберите параметры прогноза'}
      </Divider>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_item}>
          <Form.Item
            label="Модель прогноза"
            name="prognosis_type"
            rules={[{ required: true, message: 'Выберите модель прогноза' }]}
          >
            <Select
              showSearch
              placeholder="Модель прогноза"
              optionFilterProp="children"
              className={styles.input}
              options={[
                {
                  label: 'Модель Arima',
                  value: 'arima',
                },
              ]}
            />
          </Form.Item>
          <MyTooltip
            title="Выберите модель, которая будет ипользоваться при создании прогноза"
            color="geekblue"
            placement="right"
          />
        </div>
        <div className={styles.wrapper_item}>
          <Form.Item valuePropName="checked" name="is_auto_params_forecast">
            <Checkbox
              className={styles.checkbox}
              onChange={handleCheckboxClick}
            >
              {'Автоматических подбор параметров прогноза'}
            </Checkbox>
          </Form.Item>
          <MyTooltip
            title="При выборе данного пункта наиболее благоприятные параметры построения прогноза (p, d, q) будут автоматически подобраны системой"
            color="geekblue"
            placement="right"
          />
        </div>
        <div className={styles.numberInputs}>
          <div className={styles.wrapper_item}>
            <Form.Item
              name="p_value"
              label="Параметр p"
              rules={[
                {
                  required: !isAutoParams && true,
                  message: 'Выберите параметр p',
                },
              ]}
            >
              <InputNumber min={'0'} disabled={isAutoParams} />
            </Form.Item>
            <MyTooltip
              title="Параметр p для создания прогноза"
              color="geekblue"
              placement="right"
            />
          </div>
          <div className={styles.wrapper_item}>
            <Form.Item
              name="d_value"
              label="Параметр d"
              rules={[
                {
                  required: !isAutoParams && true,
                  message: 'Выберите параметр d',
                },
              ]}
            >
              <InputNumber min={'0'} disabled={isAutoParams} />
            </Form.Item>
            <MyTooltip
              title="Параметр d для создания прогноза"
              color="geekblue"
              placement="right"
            />
          </div>
          <div className={styles.wrapper_item}>
            <Form.Item
              name="q_value"
              label="Параметр q"
              rules={[
                {
                  required: !isAutoParams && true,
                  message: 'Выберите параметр q',
                },
              ]}
            >
              <InputNumber min={'0'} disabled={isAutoParams} />
            </Form.Item>
            <MyTooltip
              title="Параметр q для создания прогноза"
              color="geekblue"
              placement="right"
            />
          </div>
        </div>
        <div className={styles.wrapper_item}>
          <Form.Item
            name="n_count"
            label="Количество прогнозируемых значений данных"
            rules={[
              {
                required: true,
                message: 'Выберите количество прогнозируемых элементов',
              },
            ]}
          >
            <InputNumber min={'1'} max={'10'} />
          </Form.Item>
          <MyTooltip
            title="Количество прогнозируемых значений данных"
            color="geekblue"
            placement="right"
          />
        </div>
      </div>
    </>
  );
};
