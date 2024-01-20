import React from 'react';

import styles from './DashletLayout.module.scss';

export interface IDashletLayout {
  children: React.ReactNode;
}

export const DashletLayout: React.FC<IDashletLayout> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__chart}>{children}</div>
    </div>
  );
};
