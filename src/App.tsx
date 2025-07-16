import { type FC, useEffect } from 'react';

import { useThemeStore } from './store/themeStore';

import { Header } from './components/LayoutParts/Header';
import { Main } from './components/Main';
import { Footer } from './components/LayoutParts/Footer';

import './styles/global.scss';
import { HelloModalBlock } from './components/HelloModalBlock';

export const App: FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-wrapper">
      <HelloModalBlock />
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
