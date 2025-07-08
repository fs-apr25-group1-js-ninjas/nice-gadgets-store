import { client } from './fetchProducts';

export const getProducts = <T>(url: string) => {
  return client.get<T>(url);
};
