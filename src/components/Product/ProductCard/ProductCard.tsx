import type { FC } from 'react';

import { Card } from '../../Common/Card';

import styles from './ProductCard.module.scss';

export const ProductCard: FC = () => {
  return <Card className={styles.product}>Product Card</Card>;
};
