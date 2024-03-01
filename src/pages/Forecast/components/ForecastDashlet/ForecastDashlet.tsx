import React, { useRef, useState } from 'react';
import { DashletLayout } from '../../../../components/DashletLayout/DashletLayout';
import {
  ILegendselectchangedParams,
  ReactECharts,
} from '../../../../components/ReactECharts/ReactECharts';
import { CurrentForecast } from '../../../../types';

import {
  Button,
  Checkbox,
  Modal,
  Radio,
  RadioChangeEvent,
  Tooltip,
} from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { downloadPng, getChartOptions } from '../../utils/helpers';

import styles from './ForecastDashlet.module.scss';

interface Props {
  currentForecast: CurrentForecast;
}

export const ForecastDashlet: React.FC<Props> = ({ currentForecast }) => {
  const [isLegendClicked, setIsLegendClicked] = useState(false);
  const [radioButtonValue, setRadioButtonValue] = useState(
    currentForecast.visualization.visualization_type
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLables, setIsShowLabels] = useState(false);

  const refDashlet = useRef<HTMLDivElement>(null);

  const onShowLabelsClick = () => setIsShowLabels(!isShowLables);

  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioButtonValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const option = Object.keys(currentForecast).length
    ? getChartOptions({
        dimensions: currentForecast.dataset?.dimensions,
        measures: currentForecast.dataset.measures,
        forecast_measures: currentForecast.forecast.forecast_measures,
        color: currentForecast.visualization.color,
        unit: currentForecast.visualization?.unit,
        isLegendClicked,
        type: radioButtonValue,
        isModalOpen,
        isShowLables,
      })
    : {};

  const onEvents = {
    type: 'legendselectchanged',
    func: (params: ILegendselectchangedParams) => {
      params.selected['Спрогнозированные данные'] === false
        ? setIsLegendClicked(true)
        : setIsLegendClicked(false);
    },
  };
  return (
    <DashletLayout isModalOpen={isModalOpen} refDashlet={refDashlet}>
      <div className={styles.header}>
        <Radio.Group
          onChange={onRadioChange}
          value={radioButtonValue}
          size="small"
        >
          <Radio.Button value={'linechart'}>
            {'Линейная диаграмма'}
          </Radio.Button>
          <Radio.Button value={'barchart'}>
            {'Столбчатая диаграмма'}
          </Radio.Button>
          <Radio.Button value={'scatterchart'}>
            {'Точечная диаграмма'}
          </Radio.Button>
          <Radio.Button value={'areachart'}>
            {'Диаграмма с областями'}
          </Radio.Button>
        </Radio.Group>
        <div className={styles.header__buttons}>
          {radioButtonValue === 'barchart' && (
            <Checkbox onChange={onShowLabelsClick}>
              {'Показать подписи'}
            </Checkbox>
          )}
          <Tooltip title="Скачать png">
            <Button
              shape="circle"
              icon={<DownloadOutlined />}
              onClick={() => downloadPng({ ref: refDashlet, setIsLoading })}
              loading={isLoading}
            />
          </Tooltip>
          <Tooltip title="Раскрыть">
            <Button
              shape="circle"
              icon={<FullscreenOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </div>
      <ReactECharts option={option} onEvents={onEvents} />
      <Modal
        title={currentForecast.title}
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={
          <Tooltip title="Свернуть">
            <FullscreenExitOutlined />
          </Tooltip>
        }
        centered
        width={'80%'}
        footer={null}
      >
        <DashletLayout isModalOpen={isModalOpen}>
          <div className={styles.header}>
            <Radio.Group
              onChange={onRadioChange}
              value={radioButtonValue}
              className={styles.radio}
              size="small"
            >
              <Radio.Button value={'linechart'}>
                {'Линейная диаграмма'}
              </Radio.Button>
              <Radio.Button value={'barchart'}>
                {'Столбчатая диаграмма'}
              </Radio.Button>
              <Radio.Button value={'scatterchart'}>
                {'Точечная диаграмма'}
              </Radio.Button>
              <Radio.Button value={'areachart'}>
                {'Диаграмма с областями'}
              </Radio.Button>
            </Radio.Group>
            <div className={styles.header__buttons}>
              {radioButtonValue === 'barchart' && (
                <Checkbox onChange={onShowLabelsClick}>
                  {'Показать подписи'}
                </Checkbox>
              )}
            </div>
          </div>
          <ReactECharts option={option} onEvents={onEvents} />
        </DashletLayout>
      </Modal>
    </DashletLayout>
  );
};
