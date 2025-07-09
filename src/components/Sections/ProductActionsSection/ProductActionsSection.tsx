import { useState, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { DetailedProduct } from '../../../types/detailedProduct';

import { generateDisplayId } from '../../../utils/generateDisplayId';

import fav from '/icons/favourites.svg';
import favActive from '/icons/favourites_active.svg';

import styles from './ProductActionsSection.module.scss';

interface ProductActionsSectionProps {
  product: DetailedProduct;
}

export const ProductActionsSection: FC<ProductActionsSectionProps> = ({
  product,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedColor = searchParams.get('color') || product.color;
  const selectedCapacity = searchParams.get('capacity') || product.capacity;

  const displayId = generateDisplayId();

  const handleOptionChange = (
    optionType: 'color' | 'capacity',
    value: string,
  ) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(optionType, value);
    setSearchParams(newParams);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${product.id} to Cart`);
  };

  const handleAddToFavourites = () => {
    setIsFavorite((prev) => !prev);
    console.log(
      `Toggling favorite for product ID: ${product.id}. New state: ${!isFavorite}`,
    );
  };

  const {
    priceRegular,
    priceDiscount,
    capacityAvailable,
    colorsAvailable,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  return (
    <section className={styles.productActions}>
      <div className={styles.availableColors}>
        <div className={styles.subtitleBox}>
          <p className={styles.secondaryText}>Available colors</p>
          <p className={styles.secondaryText}>ID: {displayId}</p>
        </div>
        <div className={styles.colorOptions}>
          {colorsAvailable.map((availableColor) => {
            const isActive = availableColor === selectedColor;
            return (
              <button
                key={availableColor}
                style={{ backgroundColor: availableColor }}
                className={`${styles.colorSwatch} ${isActive ? styles.activeColor : ''}`}
                onClick={() => handleOptionChange('color', availableColor)}
                title={availableColor}
                aria-label={`Select color ${availableColor}`}
                disabled={isActive}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.selectCapacity}>
        <p className={styles.secondaryText}>Select capacity</p>
        <div className={styles.capacityOptions}>
          {capacityAvailable.map((availableCapacity) => {
            const isActive = availableCapacity === selectedCapacity;
            return (
              <button
                key={availableCapacity}
                className={`${styles.capacityButton} ${isActive ? styles.activeCapacity : ''}`}
                onClick={() =>
                  handleOptionChange('capacity', availableCapacity)
                }
                disabled={isActive}
              >
                {availableCapacity}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.prices}>
        {priceDiscount < priceRegular && (
          <p className={styles.priceDiscount}>${priceDiscount}</p>
        )}
        <p
          className={
            priceDiscount < priceRegular ?
              styles.priceRegular
            : styles.priceCurrent
          }
        >
          ${priceRegular}
        </p>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.buttonAdd}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button
          className={styles.buttonFav}
          onClick={handleAddToFavourites}
        >
          <img
            src={isFavorite ? favActive : fav}
            alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        </button>
      </div>

      <div className={styles.shortInfo}>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Screen</p>
          <p className={styles.text}>{screen}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Resolution</p>
          <p className={styles.text}>{resolution}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Processor</p>
          <p className={styles.text}>{processor}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>RAM</p>
          <p className={styles.text}>{ram}</p>
        </div>
      </div>
    </section>
  );
};
