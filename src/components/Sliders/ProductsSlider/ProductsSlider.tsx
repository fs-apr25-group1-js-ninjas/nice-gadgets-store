import { type FC } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../Product/ProductCard';
import type { Product } from '../../../types/product';

import { Swiper, SwiperSlide } from 'swiper/react';
//@ts-expect-error: Swiper CSS has no TS types
import 'swiper/scss';
import { Navigation } from 'swiper/modules';

interface Props {
  title: string;
  products: Product[];
  navigationNext?: string;
  navigationPrev?: string;
  discount?: boolean;
}

export const ProductsSlider: FC<Props> = ({
  products,
  title,
  navigationNext,
  navigationPrev,
  discount,
}) => {
  // Provide default class names if navigationNext or navigationPrev are not passed
  const nextClass = navigationNext || 'products-slider-next';
  const prevClass = navigationPrev || 'products-slider-prev';

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.controls}>
          <button className={`${styles.arrow} ${prevClass}`}>
            <img
              src={`/icons/arrow_left.svg`}
              alt="Previous"
            />
          </button>
          <button className={`${styles.arrow} ${nextClass}`}>
            <img
              src={`/icons/arrow_right.svg`}
              alt="Next"
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        spaceBetween={16}
        slidesPerView={4}
      >
        {products.length ?
          products.map((product) => (
            <SwiperSlide
              key={product.id}
              className={styles.slide}
            >
              <ProductCard
                discount={discount}
                product={product}
              />
            </SwiperSlide>
          ))
        : null}
      </Swiper>
    </section>
  );
};
