import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Main.module.scss';
import { ThemeSwitcher } from '../UI/ThemeSwitcher';
import { LoginButton } from '../LoginButton';

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.buttonsBox}>
          <div className={styles.themeSwitcherBox}>
            <ThemeSwitcher />
          </div>
          <div className={styles.loginButtonBox}>
            <LoginButton />
          </div>
        </div>

        <Outlet />
      </div>
    </main>
  );
};
