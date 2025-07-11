import usePagination from '@mui/material/usePagination';
import styles from './Pagination.module.scss';

export default function Pagination() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav
      className="pagination"
      aria-label="Pagination"
    >
      <ul className={styles.paginationList}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
