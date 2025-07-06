import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Main.module.scss';

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};
