import React from 'react';
import { Image } from 'antd';

import styles from './GreyContent.module.scss';

export const GreyContent = () => {
  return (
    <div className={styles.wrapper}>
      <Image width={40} src="../../images/icon2.png" preview={false} />
    </div>
  );
};
