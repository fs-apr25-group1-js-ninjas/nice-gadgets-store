import type { FC } from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GoBackButton } from '../../components/GoBackButton';
import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import type { DetailedProduct } from '../../types/detailedProduct';

import { parseProductUrl } from '../../utils/productUrlParser';
import { fetchDetailedProductVariants } from '../../api/productApi';
import { findProductVariant } from '../../utils/productHelpers';

import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import styles from './ProductPage.module.scss';
import { CustomSpinner } from '../../components/Spinner';

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
  const [productNotFound, setProductNotFound] = useState(false);

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
      const namespace = currentEffectiveNamespaceId;
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
      setAllProductVariants([]);
      setProduct(null);
      setProductNotFound(false);

      if (!category || !currentEffectiveNamespaceId) {
        if (active) {
          setProductNotFound(true);
          setLoading(false);
        }
        return;
      }

      try {
        const variants = await fetchDetailedProductVariants(
          category,
          currentEffectiveNamespaceId,
        );

        if (active) {
          if (variants === null || variants.length === 0) {
            setProductNotFound(true);
          } else {
            setAllProductVariants(variants);
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.error('Error fetching product data:', err);
          setError(
            err instanceof Error ?
              `Failed to load data: ${err.message}`
            : 'Failed to load product data. Please try again later.',
          );
          setLoading(false);
          setAllProductVariants([]);
          setProduct(null);
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
      if (!productNotFound) {
        setProduct(null);
      }
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

    if (!selectedVariant) {
      setProductNotFound(true);
      setProduct(null);
      return;
    }

    setProduct(selectedVariant);
    setProductNotFound(false);
  }, [
    allProductVariants,
    currentSelectedCapacityFromUrl,
    currentSelectedColorFromUrl,
    loading,
    error,
    productNotFound,
  ]);

  if (productNotFound) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.productPage}>
      {loading && (
        <div className={styles.loadingContainer}>
          <CustomSpinner
            size="lg"
            color="primary"
            label="Loading..."
          />
        </div>
      )}

      {!loading && error && (
        <>
          <div className={styles.back}>
            <GoBackButton />
          </div>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs lastItemNameOverride="Error" />
          </div>
          <h1 className={styles.productErrorTitle}>Error Loading Product</h1>
          <div className={styles.errorMessage}>{error}</div>
        </>
      )}

      {!loading && !error && product && (
        <>
          <div className={styles.back}>
            <GoBackButton />
          </div>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs lastItemNameOverride={product.name} />
          </div>
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
