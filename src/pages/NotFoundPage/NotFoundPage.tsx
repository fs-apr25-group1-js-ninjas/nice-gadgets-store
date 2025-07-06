import type { FC } from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.notFound}>
      <h1>Not found</h1>
    </div>
  );
};
