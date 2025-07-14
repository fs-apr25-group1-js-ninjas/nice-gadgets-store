import type { FC } from 'react';
import styles from './FavouritesPage.module.scss';
import type { Product } from '../../types/product';
import { ProductCard } from '../../components/Product/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const FavouritesPage: FC = () => {
  const favourites: Product[] = [
    {
      id: 1,
      name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
      price: 999,
      fullPrice: 999,
      screen: '6.1” OLED',
      capacity: '128 GB',
      ram: '6 GB',
      image: '/img/phones/apple-iphone-xr/red/00.webp',
      category: 'phones',
      itemId: 'iphone-14-pro-128-silver',
      year: 1991,
      color: 'red',
    },
    {
      id: 2,
      name: 'Apple iPhone 11 Pro Max 64GB Gold (MT9G2FS/A)',
      price: 799,
      fullPrice: 999,
      screen: '6.5” OLED',
      capacity: '64 GB',
      ram: '4 GB',
      image: '/img/phones/apple-iphone-xr/red/00.webp',
      category: 'phones',
      itemId: 'iphone-11-pro-max-64-gold',
      year: 2013,
      color: 'black',
    },
    {
      id: 3,
      name: 'Apple iPhone 11 Pro Max 64GB Gold (MT9G2FS/A)',
      price: 799,
      fullPrice: 999,
      screen: '6.5” OLED',
      capacity: '64 GB',
      ram: '4 GB',
      image: '/img/phones/apple-iphone-xr/red/00.webp',
      category: 'phones',
      itemId: 'iphone-11-pro-max-64-gold',
      year: 2013,
      color: 'black',
    },
    {
      id: 4,
      name: 'Apple iPhone 11 Pro Max 64GB Gold (MT9G2FS/A)',
      price: 799,
      fullPrice: 999,
      screen: '6.5” OLED',
      capacity: '64 GB',
      ram: '4 GB',
      image: '/img/phones/apple-iphone-xr/red/00.webp',
      category: 'phones',
      itemId: 'iphone-11-pro-max-64-gold',
      year: 2013,
      color: 'black',
    },
  ];

  return (
    <div className={styles.favorites}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs lastItemNameOverride="Favourites" />
      </div>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favourites.length} items</p>
      <div className={styles.grid}>
        {favourites.map((product) => (
          <div
            key={product.id}
            className={styles.cardWrapper}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
