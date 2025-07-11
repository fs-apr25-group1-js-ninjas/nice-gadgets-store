import type { FC } from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import backIcon from '/icons/arrow_left_active.svg';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import type { DetailedProduct } from '../../types/detailedProduct';

import { parseProductUrl } from '../../utils/productUrlParser';
import { fetchDetailedProductVariants } from '../../api/productApi';
import { findProductVariant } from '../../utils/productHelpers';

import styles from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [allProductVariants, setAllProductVariants] = useState<
    DetailedProduct[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    effectiveNamespaceId: currentEffectiveNamespaceId,
    initialSelectedCapacity: currentSelectedCapacityFromUrl,
    initialSelectedColor: currentSelectedColorFromUrl,
  } = useMemo(
    () => parseProductUrl(itemId, searchParams),
    [itemId, searchParams],
  );

  const updateProductUrl = useCallback(
    (newColor: string, newCapacity: string) => {
      const namespace = product?.namespaceId || currentEffectiveNamespaceId;
      let newId = namespace;

      if (
        newCapacity &&
        newCapacity.toLowerCase() !== '0gb' &&
        newCapacity.toLowerCase().trim() !== ''
      ) {
        newId += `-${newCapacity.toLowerCase()}`;
      }

      if (newColor && newColor.toLowerCase().trim() !== '') {
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
      product,
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
      setProduct(null);
      setAllProductVariants([]);

      if (!category || !currentEffectiveNamespaceId) {
        setError('Category or Product Namespace ID is missing in the URL.');
        setLoading(false);
        return;
      }

      try {
        const variants = await fetchDetailedProductVariants(
          category,
          currentEffectiveNamespaceId,
        );
        if (active) {
          setAllProductVariants(variants);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (active) {
          console.error('Error fetching product data:', err);
          setError(
            err instanceof Error && err.message ?
              err.message
            : 'Failed to load product data. Please try again later.',
          );
          setLoading(false);
          setAllProductVariants([]);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [category, currentEffectiveNamespaceId]);

  useEffect(() => {
    if (loading || error) {
      return;
    }

    if (allProductVariants.length === 0) {
      setProduct(null);

      return;
    }

    let selectedVariant: DetailedProduct | undefined = findProductVariant(
      allProductVariants,
      currentSelectedColorFromUrl,
      currentSelectedCapacityFromUrl,
    );

    if (!selectedVariant) {
      selectedVariant = allProductVariants.find(
        (p) =>
          (p.color?.toLowerCase() ===
            (currentSelectedColorFromUrl || '').toLowerCase() ||
            !currentSelectedColorFromUrl) &&
          (p.capacity?.toLowerCase() === '0gb' ||
            p.capacity?.toLowerCase() === ''),
      );

      if (!selectedVariant) {
        selectedVariant = allProductVariants[0];
      }
    }

    setProduct(selectedVariant || null);
  }, [
    allProductVariants,
    currentSelectedCapacityFromUrl,
    currentSelectedColorFromUrl,
    loading,
    error,
  ]);

  const handleGoBack = useCallback(() => {
    const fromPath = (location.state as { from?: string })?.from;
    if (fromPath) {
      navigate(fromPath);
    } else {
      navigate(-1);
    }
  }, [navigate, location.state]);

  return (
    <div className={styles.productPage}>
      {loading && <div>Loading...</div>}

      {!loading && error && <div>Error: {error}</div>}

      {!loading && !error && !product && <div>Product not found.</div>}

      {!loading && !error && product && (
        <>
          <Breadcrumbs lastItemNameOverride={product.name} />

          <button
            onClick={handleGoBack}
            className={styles.back}
          >
            <img
              src={backIcon}
              alt="back button"
            />
            Back
          </button>

          <h1 className={styles.productPageTitle}>{product.name}</h1>
          <div className={styles.productPageContent}>
            <ProductOverviewSection
              product={product}
              selectedColor={currentSelectedColorFromUrl}
              selectedCapacity={currentSelectedCapacityFromUrl}
              onOptionChange={updateProductUrl}
            />
            <ProductDescriptionSection product={product} />
            <RecommendedProductsSection />
          </div>
        </>
      )}
    </div>
  );
};
