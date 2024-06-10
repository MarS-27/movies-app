import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import { ToggleThemeBtn } from '../ui/ToggleThemeBtn';
import { useState } from 'react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { SearchBar } from '../ui/SearchBar';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LocalMoviesRoundedIcon
            fontSize="large"
            sx={{ mr: { xs: 0.5, sm: 2 } }}
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}
          >
            The MDb
          </Typography>

          <SearchBar />

          <DesktopNav />

          <MobileNav
            isMobileOpen={mobileOpen}
            handleMobileToggle={handleMobileToggle}
          />

          <IconButton
            color="inherit"
            size="large"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <ToggleThemeBtn />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
