import { useEffect, useState, type FC } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/Product/ProductCard';
import styles from './FavouritesPage.module.scss';
import { useCardActionsStore } from '../../hooks/useCartAndFavorites';
import type { Product } from '../../types/product';

const API_URL = '/api/products.json';

export const FavouritesPage: FC = () => {
  const { favoritesValues, loadFromStorage } = useCardActionsStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetch:', error);
      }
    };

    fetchProducts();
  }, []);

  const favouriteProducts = allProducts.filter((product) =>
    favoritesValues.includes(product.id),
  );

  return (
    <div className={styles.favorites}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs lastItemNameOverride="Favourites" />
      </div>

      <h1 className={styles.title}>Favourites</h1>

      {favouriteProducts.length === 0 ?
        <div className={styles.empty}>
          <p>The favorite is empty!</p>
        </div>
      : <>
          <p className={styles.count}>{favouriteProducts.length} items</p>
          <div className={styles.grid}>
            {favouriteProducts.map((product) => (
              <div
                key={product.id}
                className={styles.cardWrapper}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};
