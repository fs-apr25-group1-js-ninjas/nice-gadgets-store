import type { Product } from '../types/product';
import type { DetailedProduct } from '../types/detailedProduct';
import type { UnifiedProduct } from '../types/unifiedProduct';

export const mergeProductData = (
  products: Product[],
  detailedProducts: DetailedProduct[],
): UnifiedProduct[] => {
  return products.map((product) => {
    // Ищем соответствующий детальный продукт по itemId
    const detailedProduct = detailedProducts.find(
      (detailed) => detailed.id === product.itemId,
    );

    if (detailedProduct) {
      // Объединяем данные
      return {
        ...product,
        namespaceId: detailedProduct.namespaceId,
        capacityAvailable: detailedProduct.capacityAvailable,
        priceRegular: detailedProduct.priceRegular,
        priceDiscount: detailedProduct.priceDiscount,
        colorsAvailable: detailedProduct.colorsAvailable,
        images: detailedProduct.images,
        description: detailedProduct.description,
        resolution: detailedProduct.resolution,
        processor: detailedProduct.processor,
        camera: detailedProduct.camera,
        zoom: detailedProduct.zoom,
        cell: detailedProduct.cell,
      };
    }

    // Если детальных данных нет, возвращаем только базовые
    return {
      ...product,
    };
  });
};

export const getUnifiedProductsByCategory = (
  unifiedProducts: UnifiedProduct[],
  category: string,
): UnifiedProduct[] => {
  return unifiedProducts.filter((product) => product.category === category);
};

export const findUnifiedProductByItemId = (
  unifiedProducts: UnifiedProduct[],
  itemId: string,
): UnifiedProduct | undefined => {
  return unifiedProducts.find((product) => product.itemId === itemId);
};

export const getProductVariants = (
  unifiedProducts: UnifiedProduct[],
  namespaceId: string,
): UnifiedProduct[] => {
  return unifiedProducts.filter(
    (product) => product.namespaceId === namespaceId,
  );
};
