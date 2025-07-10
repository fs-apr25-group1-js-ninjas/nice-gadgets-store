import { type FC } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../Product/ProductCard';
import type { Product } from '../../../types/product';

import { Swiper, SwiperSlide } from 'swiper/react';
//@ts-expect-error: Swiper CSS has no TS types
import 'swiper/scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: FC<Props> = ({ products, title }) => {
  return (
    <section className={styles.brandNewModelsSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.cardsWrapper}>
        <Swiper
          spaceBetween={17}
          slidesPerView={4}
        >
          {products?.length &&
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  key={product.id}
                  product={product}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
