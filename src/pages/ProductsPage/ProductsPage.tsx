import { useEffect, useRef, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from '@base-ui-components/react/select';
import type { Product } from '../../types/product';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { getProducts } from '../../utils/getProducts';
import { sortProducts } from '../../utils/sortProducts';
import { ProductsListSection } from '../../components/Sections/ProductsListSection';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import IconArrowDown from '/icons/arrow_down.svg';
import styles from './ProductsPage.module.scss';
import { CATEGORY_TITLES } from '../../constants/categoryTitles';
import { SORT_BY_OPTIONS } from '../../constants/sortByOptions';
import { ITEMS_ON_PAGE_OPTIONS } from '../../constants/itemsOnPageOptions';
import { PRODUCT_PAGES_ALL_CATEGORIES } from '../../constants/productPagesAllCategories';
import classNames from 'classnames';

const API = './api/products.json';

type Category = keyof typeof CATEGORY_TITLES;

export const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState<number | 'all'>(
    ITEMS_ON_PAGE_OPTIONS[3].value,
  );
  const { category } = useParams<{ category: string }>();
  const pageTitle =
    (category && CATEGORY_TITLES[category as Category]) || 'Products';

  const productsFromServer = getProductsByCategory(
    category,
    PRODUCT_PAGES_ALL_CATEGORIES,
    products,
  );

  const listRef = useRef<HTMLDivElement>(null);

  const isAll = itemsOnPage === 'all';

  const itemsPerPage =
    isAll ? productsFromServer.length : (itemsOnPage as number);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const sortedProducts = sortProducts(productsFromServer, sortBy);

  const visibleItems =
    isAll ? sortedProducts : (
      sortedProducts.slice(startIndex, startIndex + itemsPerPage)
    );

  const pageCount =
    isAll ? 1 : Math.ceil(productsFromServer.length / itemsPerPage);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts<Product[]>(API);
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products', error);
      }
    };

    fetchAllProducts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.count}>{productsFromServer.length} models</div>
      <div
        ref={listRef}
        className={styles.selects}
      >
        <div className={classNames(styles.selectWrapper, styles.sortBy)}>
          <Select.Root
            items={SORT_BY_OPTIONS}
            value={sortBy}
            onValueChange={(event) => setSortBy(event)}
          >
            <label className={styles.selectLabel}>Sort By</label>
            <Select.Trigger className={styles.select}>
              <Select.Value />
              <Select.Icon className={styles.selectIcon}>
                <img
                  src={IconArrowDown}
                  alt="icon arrow down"
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                alignItemWithTrigger={false}
                className={styles.Positioner}
              >
                <Select.Popup className={styles.popup}>
                  {SORT_BY_OPTIONS.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.item}
                    >
                      <Select.ItemText className={styles.itemText}>
                        {label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className={styles.selectWrapper}>
          <Select.Root
            items={ITEMS_ON_PAGE_OPTIONS}
            value={itemsOnPage}
            onValueChange={(items) => setItemsOnPage(+items)}
          >
            <label className={styles.selectLabel}>Items on page</label>
            <Select.Trigger className={styles.select}>
              <Select.Value />
              <Select.Icon className={styles.selectIcon}>
                <img
                  src={IconArrowDown}
                  alt="icon arrow down"
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner alignItemWithTrigger={false}>
                <Select.Popup className={styles.popup}>
                  {ITEMS_ON_PAGE_OPTIONS.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.item}
                    >
                      <Select.ItemText className={styles.itemText}>
                        {label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      {visibleItems.length > 0 ?
        <ProductsListSection productsFromServer={visibleItems} />
      : <h3>Loading...</h3>}
      {!isAll && (
        <Pagination
          totalPages={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
