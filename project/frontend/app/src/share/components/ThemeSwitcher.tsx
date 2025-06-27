import { useTheme } from '../layouts/context/ThemeContext';
import { IconButton } from '@mui/material';
// Ícones do MUI
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Ícone escuro
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Ícone claro

// Você precisará instalar os ícones:
// npm install @mui/icons-material

export const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

