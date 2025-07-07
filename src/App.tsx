import { useEffect, type FC } from 'react';

import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';
import { Footer } from './components/LayoutParts/Footer';
import { client } from './utils/fetchProducts';
import type { ProductsApiResponse } from './types/product';

const getProducts = () => {
  return client.get<ProductsApiResponse>('./api/products.json');
};

export const App: FC = () => {
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const productsFromServer = await getProducts();

        // setProducts(productsFromServer);
        console.log(productsFromServer); // delete this console.log
      } catch (error) {
        console.log(error); // change this console.log to 'throw New error'
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
