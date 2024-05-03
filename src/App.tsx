import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import useColorTheme from './hooks/useColorTheme';
import { ColorModeProvider } from './context/themeContext';

const App = () => {
  const { colorMode, theme } = useColorTheme();

  return (
    <ColorModeProvider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Header />
          <Container
            component="main"
            maxWidth="lg"
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Outlet />
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorModeProvider>
  );
};

export default App;
