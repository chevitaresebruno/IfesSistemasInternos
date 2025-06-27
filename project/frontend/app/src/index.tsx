import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './share/router/index';
import { CustomThemeProvider } from './share/layouts/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AppRouter />
    </CustomThemeProvider>
  </React.StrictMode>
);