import { type FC, useCallback, useMemo, useEffect } from 'react';

import type { UnifiedProduct } from '../../../types/unifiedProduct';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';

import fav from '/icons/favourites.svg';
import favActive from '/icons/favourites_active.svg';

import { generateDisplayId } from '../../../utils/generateDisplayId';
import { COLOR_MAP } from '../../../constants/colorMap';

import styles from './ProductActionsSection.module.scss';

interface ProductActionsSectionProps {
  product: UnifiedProduct;
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
  const {
    addToCart,
    addToFavorites,
    cartValues,
    favoritesValues,
    loadFromStorage,
  } = useCartActionsStore();

  const inCart = Boolean(cartValues[product.id]);
  const isFavorited = favoritesValues.includes(product.id);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

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
    addToCart(product.id);
  };

  const handleAddToFavourites = () => {
    addToFavorites(product.id);
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

  // Используем данные из объединенного типа, с фоллбэком на старые поля
  const actualCapacityAvailable = capacityAvailable || [];
  const actualColorsAvailable = colorsAvailable || [];
  const actualPriceRegular = priceRegular || product.fullPrice;
  const actualPriceDiscount = priceDiscount || product.price;

  return (
    <section className={styles.productActions}>
      <div className={styles.availableColors}>
        <div className={styles.subtitleBox}>
          <p className={styles.secondaryText}>Available colors</p>
          <p className={styles.secondaryText}>ID: {displayId}</p>
        </div>
        <div className={styles.colorOptions}>
          {actualColorsAvailable.map((availableColor) => {
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
          {actualCapacityAvailable.map((availableCapacity) => {
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
        {actualPriceDiscount < actualPriceRegular && (
          <p className={styles.priceDiscount}>${actualPriceDiscount}</p>
        )}
        <p
          className={
            actualPriceDiscount < actualPriceRegular ?
              styles.priceRegular
            : styles.priceCurrent
          }
        >
          ${actualPriceRegular}
        </p>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.buttonAdd}
          onClick={handleAddToCart}
          disabled={inCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={styles.buttonFav}
          onClick={handleAddToFavourites}
        >
          <img
            src={isFavorited ? favActive : fav}
            alt={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
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
