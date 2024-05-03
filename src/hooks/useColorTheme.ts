import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { type PaletteMode } from '@mui/material';

const lightTheme = {
  primary: {
    main: '#009688',
    contrastText: '#fafafa',
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
};

const darkTheme = {
  primary: {
    main: '#263238',
    contrastText: '#fafafa',
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
