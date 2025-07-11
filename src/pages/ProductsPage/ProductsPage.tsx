import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from '@base-ui-components/react/select';
import type { Product } from '../../types/product';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { getProducts } from '../../utils/getProducts';
import { sortProducts } from '../../utils/sortProducts';
import { ProductsListSection } from '../../components/Sections/ProductsListSection';
import IconArrowDown from '/icons/arrow_down.svg';
import styles from './ProductsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination/Pagination';

const API = './api/products.json';

const allCategories = ['phones', 'tablets', 'accessories'];

const categoryTitles = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

const sortByOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Lowest Price', value: 'lowestPrice' },
  { label: 'Highest Price', value: 'highestPrice' },
];

const itemsOnPageOptions = [
  { label: '8', value: 8 },
  { label: '16', value: 16 },
  { label: '32', value: 32 },
  { label: '64', value: 64 },
];

type Category = keyof typeof categoryTitles;

export const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [itemsOnPage, setItemsOnPage] = useState(itemsOnPageOptions[0].value);
  const { category } = useParams<{ category: string }>();
  const pageTitle =
    (category && categoryTitles[category as Category]) || 'Products';

  const filteredProducts = getProductsByCategory(
    category,
    allCategories,
    products,
  );

  const sortProductsBy = sortProducts(filteredProducts, sortBy);

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

  // console.log(itemsOnPage);

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.count}>{filteredProducts.length} models</div>
      <div className={styles.selects}>
        <div className={styles.selectWrapper}>
          <Select.Root
            items={sortByOptions}
            value={sortBy}
            onValueChange={(event) => setSortBy(event)}
          >
            <label className={styles.SelectLabel}>Sort By</label>
            <Select.Trigger className={styles.Select}>
              <Select.Value />
              <Select.Icon className={styles.SelectIcon}>
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
                <Select.Popup className={styles.Popup}>
                  {sortByOptions.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.Item}
                    >
                      <Select.ItemText className={styles.ItemText}>
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
            items={itemsOnPageOptions}
            value={itemsOnPage}
            onValueChange={(event) => setItemsOnPage(event)}
          >
            <label className={styles.SelectLabel}>Items on page</label>
            <Select.Trigger className={styles.Select}>
              <Select.Value />
              <Select.Icon className={styles.SelectIcon}>
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
                <Select.Popup className={styles.Popup}>
                  {itemsOnPageOptions.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.Item}
                    >
                      <Select.ItemText className={styles.ItemText}>
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
      <ProductsListSection filteredProducts={sortProductsBy} />
      {/* <div className={styles.pagination}></div> */}
      <Pagination />
    </div>
  );
};
