import { type FC } from 'react';
import login from '/icons/login.svg';
import styles from './LoginButton.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const LoginButton: FC = () => {
  return (
    <Link
      to="/login"
      className={styles.loginButton}
    >
      <img
        src={login}
        alt="Login"
        className={clsx(styles.loginIcon, 'app-icon')}
      />
    </Link>
  );
};
