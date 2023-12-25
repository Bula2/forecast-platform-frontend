import React from 'react';

import { Divider, Form, Input, Select } from 'antd';
import { MyTooltip } from '../../../../components/MyTooltip/MyTooltip';

import styles from './ForecastInfo.module.scss';

export const ForecastInfo = () => {
  const onChange = (value: string) => {
    return;
  };

  const onSearch = (value: string) => {
    return;
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
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
            initialValue="arima"
          >
            <Select
              showSearch
              placeholder="Модель прогноза"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
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
      </div>
    </>
  );
};
