import type { FC } from 'react';
import styles from './Button.module.scss';

export const Button: FC = () => {
  return <button className={styles.button}>Button</button>;
};
