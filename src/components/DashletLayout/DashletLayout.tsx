import React from 'react';

import styles from './DashletLayout.module.scss';
import classnames from 'classnames';

export interface IDashletLayout {
  children: React.ReactNode;
  isModalOpen: boolean;
}

export const DashletLayout: React.FC<IDashletLayout> = ({
  children,
  isModalOpen,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={classnames(
          styles.wrapper__chart,
          isModalOpen && styles.wrapper__chartModal
        )}
      >
        {children}
      </div>
    </div>
  );
};
