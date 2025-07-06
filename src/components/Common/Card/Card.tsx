import type { FC } from 'react';
import styles from './Card.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className, ...restProps }) => {
  const cardClasses = `${styles.card} ${className || ''}`.trim();

  return (
    <article
      className={cardClasses}
      {...restProps}
    >
      {children}
    </article>
  );
};
