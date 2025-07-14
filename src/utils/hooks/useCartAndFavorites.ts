import { useEffect, useState } from 'react';

export const NICE_GADGETS_STORE = {
  CART: 'NICE_GADGETS_STORE_CART',
  FAVORITES: 'NICE_GADGETS_STORE_FAVORITES',
};

type Cart = Record<number, number>;
type Favorites = number[];

export function useCartAndFavorites() {
  const [cartValues, setCartValues] = useState<Cart>({});
  const [favoritesValues, setFavoritesValues] = useState<Favorites>([]);

  const getCart = () => {
    const storedValue = localStorage.getItem(NICE_GADGETS_STORE.CART);

    return storedValue ? JSON.parse(storedValue) : {};
  };

  const addToCart = (value: number) => {
    const cart = getCart();

    if (!cart[value]) {
      cart[value] = 1;
      localStorage.setItem(NICE_GADGETS_STORE.CART, JSON.stringify(cart));
    }

    setCartValues(getCart());
  };

  const getFavorites = () => {
    const storedValue = localStorage.getItem(NICE_GADGETS_STORE.FAVORITES);

    return storedValue ? JSON.parse(storedValue) : [];
  };

  const addToFavorites = (value: number) => {
    const favorites = getFavorites();

    if (!favorites.includes(value)) {
      favorites.push(value);
      localStorage.setItem(
        NICE_GADGETS_STORE.FAVORITES,
        JSON.stringify(favorites),
      );
    } else {
      const index = favorites.indexOf(value);

      if (index > -1) {
        favorites.splice(index, 1);
      }

      localStorage.setItem(
        NICE_GADGETS_STORE.FAVORITES,
        JSON.stringify(favorites),
      );
    }

    setFavoritesValues(getFavorites());
  };

  useEffect(() => {
    setCartValues(getCart());
    setFavoritesValues(getFavorites());
  }, []);

  return {
    cartValues,
    favoritesValues,

    addToCart,
    getCart,
    addToFavorites,
    getFavorites,
  };
}
