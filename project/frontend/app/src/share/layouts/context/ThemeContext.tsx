import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
// Importe o ThemeProvider do MUI
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// O CssBaseline é um componente do MUI que normaliza estilos e aplica a cor de fundo do tema
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../styles/themes/Theme';
import usePersistedState from '../../hooks/auth/UserPersistedState';

type ThemeName = 'light' | 'dark';

interface ThemeContextType {
  themeName: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = usePersistedState<ThemeName>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setThemeName((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setThemeName]);

  const currentTheme = useMemo(() => (themeName === 'light' ? lightTheme : darkTheme), [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {/* 1. Usamos o ThemeProvider do MUI */}
      <MuiThemeProvider theme={currentTheme}>
        {/* 2. CssBaseline é muito importante! Ele aplica os estilos base do tema. */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um CustomThemeProvider');
  }
  return context;
};