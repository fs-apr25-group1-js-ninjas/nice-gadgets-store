import usePagination from '@mui/material/usePagination';
import classNames from 'classnames';
import type { FC } from 'react';
import styles from './Pagination.module.scss';
import ArrowLeft from '/icons/arrow_left_active.svg';
import ArrowRight from '/icons/arrow_right_active.svg';
import { useMediaQuery } from 'react-responsive';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: 640 });
  const siblingCount = isLargeScreen ? 1 : 0;

  const { items } = usePagination({
    count: totalPages,
    page: currentPage,
    onChange: (_, page) => {
      onPageChange(page);
    },
    siblingCount: siblingCount,
  });

  return (
    <nav
      className={styles.pagination}
      aria-label="Pagination"
    >
      <ul className={styles.paginationList}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '...';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className={classNames(styles.pageButton, {
                  [styles.selected]: selected,
                  [styles.unselected]: !selected,
                })}
                {...item}
              >
                {page}
              </button>
            );
          } else if (type === 'previous') {
            children = (
              <button
                type="button"
                className={styles.navButton}
                {...item}
              >
                <img
                  src={ArrowLeft}
                  alt="Previous"
                />
              </button>
            );
          } else if (type === 'next') {
            children = (
              <button
                type="button"
                className={styles.navButton}
                {...item}
              >
                <img
                  src={ArrowRight}
                  alt="Next"
                />
              </button>
            );
          }

          return (
            <li
              key={index}
              className={styles.paginationItem}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
