import type {
  DetailedProduct,
  DetailedProductsApiResponse,
} from '../types/detailedProduct';

import type { Product, ProductsApiResponse } from '../types/product';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
  method = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(100)
    .then(() => fetch(url, options))
    .then(async (response) => {
      if (response.status === 404) {
        throw new Error('Not Found');
      }

      if (!response.ok) {
        throw new Error('Request failed');
      }

      try {
        return await response.json();
      } catch {
        throw new Error('Invalid JSON');
      }
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
};

export const fetchDetailedProductVariants = async (
  category: string,
  namespaceId: string,
): Promise<DetailedProduct[] | null> => {
  if (!category || !namespaceId) {
    return null;
  }

  const fileName = `${category.toLowerCase()}.json`;

  let allProducts: DetailedProductsApiResponse;

  try {
    allProducts = await client.get<DetailedProductsApiResponse>(
      `/api/${fileName}`,
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'Not Found') {
      return null;
    }

    console.error('Fetch error:', error);
    throw new Error('Failed to fetch product variants');
  }

  const variants = allProducts.filter((p) => p.namespaceId === namespaceId);
  return variants.length > 0 ? variants : null;
};

export const fetchProducts = async (
  category: string,
): Promise<Product[] | null> => {
  if (!category) {
    return null;
  }

  const fileName = `${category.toLowerCase()}-catalog.json`;

  let products: ProductsApiResponse;

  try {
    products = await client.get<ProductsApiResponse>(`/api/${fileName}`);
  } catch (error) {
    if (error instanceof Error && error.message === 'Not Found') {
      return null;
    }

    console.error('Fetch error:', error);
    throw new Error('Failed to fetch products');
  }

  return products.length > 0 ? products : null;
};
