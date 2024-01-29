import React, { RefObject } from 'react';
import classnames from 'classnames';

import styles from './DashletLayout.module.scss';

export interface IDashletLayout {
  children: React.ReactNode;
  isModalOpen: boolean;
  refDashlet?: RefObject<HTMLDivElement>;
}

export const DashletLayout: React.FC<IDashletLayout> = ({
  children,
  isModalOpen,
  refDashlet,
}) => {
  return (
    <div className={styles.wrapper} ref={refDashlet}>
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
