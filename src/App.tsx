import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#96000f',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
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
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
