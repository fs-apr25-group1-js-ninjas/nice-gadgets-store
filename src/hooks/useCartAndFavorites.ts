import { create } from 'zustand';

export const NICE_GADGETS_STORE = {
  CART: 'NICE_GADGETS_STORE_CART',
  FAVORITES: 'NICE_GADGETS_STORE_FAVORITES',
};

type Cart = Record<string, number>;
type Favorites = string[];
type Store = {
  cartValues: Cart;
  favoritesValues: Favorites;
  addToCart: (id: string) => void;
  addToFavorites: (id: string) => void;
  loadFromStorage: () => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

export const useCartActionsStore = create<Store>((set, get) => ({
  cartValues: {},
  favoritesValues: [],

  loadFromStorage: () => {
    const cart = JSON.parse(
      localStorage.getItem(NICE_GADGETS_STORE.CART) || '{}',
    );
    const favs = JSON.parse(
      localStorage.getItem(NICE_GADGETS_STORE.FAVORITES) || '[]',
    );
    set({ cartValues: cart, favoritesValues: favs });
  },

  addToCart: (id: string) => {
    const cart = get().cartValues;

    if (!cart[id]) {
      const updatedCart = { ...cart, [id]: 1 };

      localStorage.setItem(
        NICE_GADGETS_STORE.CART,
        JSON.stringify(updatedCart),
      );

      set({ cartValues: updatedCart });
    }
  },

  addToFavorites: (id: string) => {
    const favs = get().favoritesValues;
    let updated;
    if (favs.includes(id)) {
      updated = favs.filter((i) => i !== id);
    } else {
      updated = [...favs, id];
    }
    localStorage.setItem(NICE_GADGETS_STORE.FAVORITES, JSON.stringify(updated));

    set({ favoritesValues: updated });
  },

  removeFromCart: (id: string) => {
    const cart = get().cartValues;
    if (cart[id]) {
      const updatedCart = { ...cart };
      delete updatedCart[id];
      localStorage.setItem(
        NICE_GADGETS_STORE.CART,
        JSON.stringify(updatedCart),
      );
      set({ cartValues: updatedCart });
    }
  },

  increaseQuantity: (id: string) => {
    const cart = get().cartValues;
    if (cart[id]) {
      const updatedCart = { ...cart, [id]: cart[id] + 1 };
      localStorage.setItem(
        NICE_GADGETS_STORE.CART,
        JSON.stringify(updatedCart),
      );
      set({ cartValues: updatedCart });
    }
  },

  decreaseQuantity: (id: string) => {
    const cart = get().cartValues;
    if (cart[id] > 1) {
      const updatedCart = { ...cart, [id]: cart[id] - 1 };
      localStorage.setItem(
        NICE_GADGETS_STORE.CART,
        JSON.stringify(updatedCart),
      );
      set({ cartValues: updatedCart });
    } else if (cart[id] === 1) {
      get().removeFromCart(id);
    }
  },
}));
