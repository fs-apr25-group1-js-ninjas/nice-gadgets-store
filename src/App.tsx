import type { FC } from 'react';

import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';
import { Footer } from './components/LayoutParts/Footer';

export const App: FC = () => (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);
