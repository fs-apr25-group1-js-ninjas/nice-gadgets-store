import { useState, type FC, useCallback, useMemo } from 'react';

import type { DetailedProduct } from '../../../types/detailedProduct';

import fav from '/icons/favourites.svg';
import favActive from '/icons/favourites_active.svg';

import { generateDisplayId } from '../../../utils/generateDisplayId';
import { COLOR_MAP } from '../../../constants/colorMap';

import styles from './ProductActionsSection.module.scss';

interface ProductActionsSectionProps {
  product: DetailedProduct;
  selectedColor: string | null;
  selectedCapacity: string | null;
  onOptionChange: (newColor: string, newCapacity: string) => void;
}

export const ProductActionsSection: FC<ProductActionsSectionProps> = ({
  product,
  selectedColor,
  selectedCapacity,
  onOptionChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const displayId = useMemo(() => {
    return generateDisplayId(product);
  }, [product]);

  const handleOptionChange = useCallback(
    (optionType: 'color' | 'capacity', value: string) => {
      const newColor = optionType === 'color' ? value : selectedColor || '';
      const newCapacity =
        optionType === 'capacity' ? value : selectedCapacity || '';

      const finalNewCapacity =
        (
          newCapacity.toLowerCase() === '0gb' ||
          newCapacity.toLowerCase().trim() === ''
        ) ?
          ''
        : newCapacity;

      const finalNewColor =
        newColor.toLowerCase().trim() === '' ? '' : newColor;

      onOptionChange(finalNewColor, finalNewCapacity);
    },
    [onOptionChange, selectedColor, selectedCapacity],
  );

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
            const colorValue =
              COLOR_MAP[availableColor.toLowerCase()] || availableColor;

            const isActive =
              availableColor.toLowerCase() ===
              (selectedColor || '').toLowerCase();
            return (
              <button
                key={availableColor}
                style={{ backgroundColor: colorValue }}
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
            const isActive =
              availableCapacity.toLowerCase() ===
              (selectedCapacity || '').toLowerCase();
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
