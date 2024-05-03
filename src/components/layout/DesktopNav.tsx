import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const DesktopNav = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Button
        component={NavLink}
        to="/"
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      >
        Home
      </Button>
      <Button
        component={NavLink}
        to="/movies"
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      >
        Movies
      </Button>
    </Box>
  );
};
