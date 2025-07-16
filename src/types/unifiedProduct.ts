export interface ProductDescription {
  title: string;
  text: string[];
}

export interface UnifiedProduct {
  // Базовые данные из products.json
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;

  // Детальные данные из phones.json, tablets.json, accessories.json
  namespaceId?: string;
  capacityAvailable?: string[];
  priceRegular?: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  images?: string[];
  description?: ProductDescription[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export type UnifiedProductsApiResponse = UnifiedProduct[];
