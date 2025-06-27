import { createTheme, Theme } from '@mui/material/styles';

// Definimos nossas paletas de cores customizadas
const lightPalette = {
  primary: {
    main: '#359830', // Cor primária (botões, links, etc.)
    contrastText: '#ffffff', // Cor do texto em cima da cor primária
  },
  secondary: {
    main: '#c90c0f', // Cor secundária
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8f9fa', // Cor de fundo do body
    paper: '#ffffff', // Cor de fundo de "papéis" (Cards, Menus, etc.)
  },
  text: {
    primary: '#212529', // Cor principal de texto
    secondary: '#6c757d', // Cor secundária de texto (para hints, legendas)
  },
};

const darkPalette = {
  primary: {
    main: '#4dabf7',
    contrastText: '#000000',
  },
  secondary: {
    main: '#868e96',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#e9ecef',
    secondary: '#adb5bd',
  },
};

// 1. Criando o tema claro com createTheme
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light', // Essencial para o MUI saber que é um tema claro
    ...lightPalette,
  },
  // Você pode customizar outras coisas aqui, como tipografia
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
    },
  },
});

// 2. Criando o tema escuro com createTheme
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark', // Essencial para o MUI saber que é um tema escuro
    ...darkPalette,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    // O MUI pode ajustar automaticamente as cores da tipografia com base no modo
  },
});

