import React, { useContext } from 'react';
import classNames from 'classnames';
import styles from './Page404.module.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Page404 = () => {
  const { user } = useContext(AuthContext);
  const isVika = user?.email === 'vikabatina@bk.ru';
  return (
    <div
      className={classNames(styles.body, {
        [styles.backgroundForVika]: isVika,
      })}
    >
      <main className={classNames(styles.bsod, styles.container)}>
        <h1 className={classNames(styles.neg, styles.title, styles.h1)}>
          <span
            className={classNames(
              isVika ? styles.backgroundForVika2 : styles.bg,
              {
                [styles.colorForVika]: isVika,
              }
            )}
          >
            {'Error - 404'}
          </span>
        </h1>
        <p className={styles.p}> This page is unavailable</p>
        <p className={styles.p}>* Please return home.</p>
        <nav className={styles.nav}>
          <Link to="/" className={isVika ? styles.linkForVika : styles.link}>
            На главную
          </Link>
        </nav>
      </main>
    </div>
  );
};
