import React, { useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePersistedState from './utils/usePersistedState';

import Routes from './routes';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light)
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppProvider>
            <ThemeSwitcher toggleTheme={toggleTheme} />

            <Routes />
          </AppProvider>

          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
