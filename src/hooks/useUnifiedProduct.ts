import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Location, NavigateFunction } from 'react-router-dom';
import type { UnifiedProduct } from '../types/unifiedProduct';
import { firebaseApi } from '../utils/fetchProducts';
import { parseProductUrl } from '../utils/productUrlParser';
import {
  getProductVariants,
  findUnifiedProductByItemId,
} from '../utils/mergeProductData';

interface UseUnifiedProductParams {
  category?: string;
  itemId?: string;
  searchParams: URLSearchParams;
  navigate: NavigateFunction;
  location: Location;
}

export const useUnifiedProduct = ({
  category,
  itemId,
  searchParams,
  navigate,
  location,
}: UseUnifiedProductParams) => {
  const [product, setProduct] = useState<UnifiedProduct | null>(null);
  const [allProducts, setAllProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productNotFound, setProductNotFound] = useState(false);

  const {
    effectiveNamespaceId: currentEffectiveNamespaceId,
    initialSelectedCapacity: currentSelectedCapacityFromUrl,
    initialSelectedColor: currentSelectedColorFromUrl,
  } = useMemo(
    () => parseProductUrl(itemId ?? '', searchParams),
    [itemId, searchParams],
  );

  const updateProductUrl = useCallback(
    (newColor: string, newCapacity: string) => {
      const namespace = currentEffectiveNamespaceId;
      if (!namespace || !category) return;

      let newId = namespace;

      if (
        newCapacity &&
        newCapacity.toLowerCase() !== '0gb' &&
        newCapacity.trim() !== ''
      ) {
        newId += `-${newCapacity.toLowerCase()}`;
      }

      if (newColor && newColor.trim() !== '') {
        newId += `-${newColor.toLowerCase()}`;
      }

      const newPath = `/${category}/${newId}`;
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true, state: location.state });
      }
    },
    [
      navigate,
      category,
      currentEffectiveNamespaceId,
      location.pathname,
      location.state,
    ],
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setProductNotFound(false);
      setProduct(null);

      try {
        const products = await firebaseApi.getAllProducts();
        if (active) {
          setAllProducts(products);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.error('Error fetching products:', err);
          setError('Failed to load products');
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!allProducts.length || !itemId) return;

    console.log('Searching for product with itemId:', itemId);
    console.log('Current namespace ID:', currentEffectiveNamespaceId);
    console.log('All products count:', allProducts.length);

    // Попытка найти товар по точному itemId
    let foundProduct = findUnifiedProductByItemId(allProducts, itemId);
    console.log('Found product by itemId:', foundProduct);

    if (!foundProduct && currentEffectiveNamespaceId) {
      // Если не найден по itemId, ищем по namespaceId и опциям
      const variants = getProductVariants(
        allProducts,
        currentEffectiveNamespaceId,
      );
      console.log('Found variants by namespace:', variants);

      if (variants.length > 0) {
        // Ищем вариант по цвету и объему
        foundProduct = variants.find((variant) => {
          const colorMatch =
            !currentSelectedColorFromUrl ||
            variant.color?.toLowerCase() ===
              currentSelectedColorFromUrl.toLowerCase();
          const capacityMatch =
            !currentSelectedCapacityFromUrl ||
            variant.capacity?.toLowerCase() ===
              currentSelectedCapacityFromUrl.toLowerCase();
          return colorMatch && capacityMatch;
        });

        // Если не найден точный вариант, берем первый
        if (!foundProduct) {
          foundProduct = variants[0];
        }
      }
    }

    console.log('Final found product:', foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);
      setProductNotFound(false);
    } else {
      setProductNotFound(true);
      setProduct(null);
    }
  }, [
    allProducts,
    itemId,
    currentEffectiveNamespaceId,
    currentSelectedColorFromUrl,
    currentSelectedCapacityFromUrl,
  ]);

  return {
    product,
    loading,
    error,
    productNotFound,
    updateProductUrl,
    currentSelectedColorFromUrl,
    currentSelectedCapacityFromUrl,
  };
};
