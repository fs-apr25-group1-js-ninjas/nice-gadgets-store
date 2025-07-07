import { type FC } from 'react';

import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';
import { Footer } from './components/LayoutParts/Footer';

export const App: FC = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const productsFromServer = await getProducts();

  //       // setProducts(productsFromServer);
  //       console.log(productsFromServer); // delete this console.log
  //     } catch (error) {
  //       console.log(error); // change this console.log to 'throw New error'
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
