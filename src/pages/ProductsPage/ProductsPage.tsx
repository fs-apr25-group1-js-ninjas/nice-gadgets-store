import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/product';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { getProducts } from '../../utils/getProducts';
import { ProductsListSection } from '../../components/Sections/ProductsListSection';
import styles from './ProductsPage.module.scss';

const ALL_CATEGORIES = ['phones', 'tablets', 'accessories'];
const URL = './api/products.json';
const CATEGORY_TITLES = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

type Category = keyof typeof CATEGORY_TITLES;

export const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { category } = useParams<{ category: string }>();
  const pageTitle =
    (category && CATEGORY_TITLES[category as Category]) || 'Products';

  const filteredProducts = getProductsByCategory(
    category,
    ALL_CATEGORIES,
    products,
  );

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts<Product[]>(URL);
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products', error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>Breadcrumbs</div>
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.count}>{filteredProducts.length} models</div>
      <div className={styles.sortBoxes}>
        <div className={styles.sortBy}></div>
        <div className={styles.itemsOnPage}></div>
      </div>
      <ProductsListSection filteredProducts={filteredProducts} />
      <div className={styles.pagination}></div>
    </div>
  );
};
