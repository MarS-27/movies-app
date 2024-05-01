import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#009688',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fafafa',
      paper: '#eeeeee',
    },
    error: {
      main: '#ce2d2d',
    },
    text: {
      primary: '#212121',
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1de9b6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f4511e',
    },
    background: {
      default: '#212121',
      paper: '#455a64',
    },
    error: {
      main: '#ce2d2d',
    },
    text: {
      primary: '#fafafa',
    },
    warning: {
      main: '#ed6c02',
    },
  },
};

export default function useColorTheme() {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? lightTheme : darkTheme),
        },
      }),
    [mode],
  );

  return { colorMode, theme };
}
