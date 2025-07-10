import type { FC } from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import backIcon from '/icons/arrow_left_active.svg';

import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import type {
  DetailedProduct,
  DetailedProductsApiResponse,
} from '../../types/detailedProduct';

import styles from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [allProductVariants, setAllProductVariants] = useState<
    DetailedProduct[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parsedUrlInfo = useMemo(() => {
    let effectiveNamespaceId = itemId;
    let parsedCapacity: string | null = null;
    let parsedColor: string | null = null;

    if (itemId) {
      const regex =
        /^(.*?)(?:-(\d+(?:gb|mb|tb)))-([a-z]+(?:-[a-z]+)*)$|^(.+?)-([a-z]+(?:-[a-z]+)*)$|^(.+)$/i;
      const match = itemId.match(regex);

      if (match) {
        if (match[1] && match[2] && match[3]) {
          effectiveNamespaceId = match[1];
          parsedCapacity = match[2].toUpperCase();
          parsedColor = match[3].toLowerCase();
        } else if (match[4] && match[5]) {
          effectiveNamespaceId = match[4];
          parsedColor = match[5].toLowerCase();
        } else if (match[6]) {
          effectiveNamespaceId = match[6];
        }
      }
    }

    const searchParamCapacity = searchParams.get('capacity');
    const searchParamColor = searchParams.get('color');

    return {
      effectiveNamespaceId: effectiveNamespaceId,
      initialSelectedCapacity: searchParamCapacity || parsedCapacity,
      initialSelectedColor: searchParamColor || parsedColor,
    };
  }, [itemId, searchParams]);

  const {
    effectiveNamespaceId,
    initialSelectedCapacity,
    initialSelectedColor,
  } = parsedUrlInfo;

  const findProductVariant = useCallback(
    (
      variants: DetailedProduct[],
      color: string | null,
      capacity: string | null,
    ): DetailedProduct | undefined => {
      return variants.find(
        (p) =>
          p.color.toLowerCase() === (color || '').toLowerCase() &&
          p.capacity.toLowerCase() === (capacity || '').toLowerCase(),
      );
    },
    [],
  );

  useEffect(() => {
    const fetchAllProductVariants = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      setAllProductVariants([]);

      if (!category || !effectiveNamespaceId) {
        setError('Category or Product ID is missing in the URL.');
        setLoading(false);
        return;
      }

      try {
        const categoryFileName = `${category.toLowerCase()}.json`;
        const response = await fetch(`/api/${categoryFileName}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Category data for "${category}" not found.`);
          }
          throw new Error(
            `Failed to fetch category data: ${response.statusText}`,
          );
        }

        const allProductsInCategory: DetailedProductsApiResponse =
          await response.json();
        const variantsForNamespace = allProductsInCategory.filter(
          (p) => p.namespaceId === effectiveNamespaceId,
        );

        if (variantsForNamespace.length === 0) {
          throw new Error(
            `Product with namespace ID "${effectiveNamespaceId}" not found in category "${category}". Please ensure this namespaceId exists in your "${categoryFileName}" file.`,
          );
        }

        setAllProductVariants(variantsForNamespace);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching all product variants:', err);
        setError('Failed to load product data. Please try again later.');
        setLoading(false);
        setAllProductVariants([]);
      }
    };

    fetchAllProductVariants();
  }, [category, effectiveNamespaceId]);

  useEffect(() => {
    if (allProductVariants.length === 0 && !loading && !error) {
      setProduct(null);
      return;
    }

    if (allProductVariants.length === 0) {
      return;
    }

    let selectedVariant = findProductVariant(
      allProductVariants,
      initialSelectedColor,
      initialSelectedCapacity,
    );

    if (!selectedVariant) {
      selectedVariant = allProductVariants[0];
      const newParams = new URLSearchParams(searchParams);
      if (
        selectedVariant.color.toLowerCase() !==
          (initialSelectedColor || '').toLowerCase() ||
        selectedVariant.capacity.toLowerCase() !==
          (initialSelectedCapacity || '').toLowerCase()
      ) {
        newParams.set('color', selectedVariant.color.toLowerCase());
        newParams.set('capacity', selectedVariant.capacity.toLowerCase());
        navigate(`?${newParams.toString()}`, { replace: true });
      }
    }

    setProduct(selectedVariant);
  }, [
    allProductVariants,
    searchParams,
    findProductVariant,
    navigate,
    initialSelectedCapacity,
    initialSelectedColor,
    loading,
    error,
  ]);

  return (
    <div className={styles.productPage}>
      {loading && <div>Loading...</div>}

      {!loading && error && <div>Error: {error}</div>}

      {!loading && !error && !product && <div>Product not found.</div>}

      {!loading && !error && product && (
        <>
          <button
            onClick={() => navigate(-1)}
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
            <ProductOverviewSection product={product} />
            <ProductDescriptionSection product={product} />
            <RecommendedProductsSection
            // currentProductId={product.id}
            // currentProductCategory={product.category}
            // currentProductNamespaceId={product.namespaceId}
            />
          </div>
        </>
      )}
    </div>
  );
};
