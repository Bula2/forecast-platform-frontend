import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

import styles from './MyTooltip.module.scss';

interface IProps {
  title?: string;
  color?: string;
  placement?: string;
  myContent?: React.ReactNode;
  className?: string;
}

export const MyTooltip: React.FC<IProps> = ({
  title,
  color,
  placement,
  myContent,
  className,
}) => {
  return (
    <Tooltip
      className={styles.tooltip}
      title={title || ''}
      color={color || 'geekblue'}
      placement={(placement as any) || 'right'}
    >
      {myContent || (
        <QuestionCircleTwoTone className={className || styles.icon} />
      )}
    </Tooltip>
  );
};
