import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import { HeaderLink } from './HeaderLink';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalMoviesRoundedIcon fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The MDb
        </Typography>
        <Box component="nav" sx={{ flexGrow: 1, textAlign: 'end' }}>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/movies">Movies</HeaderLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
