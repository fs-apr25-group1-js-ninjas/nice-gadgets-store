import type { FC } from 'react';

import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';
import { Footer } from './components/LayoutParts/Footer';

import styles from './App.module.scss';

export const App: FC = () => (
  <div className={styles.container}>
    <Header />
    <Main />
    <Footer />
  </div>
);
