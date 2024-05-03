import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

type MobileNavProps = {
  isMobileOpen: boolean;
  handleMobileToggle: () => void;
};

export const MobileNav: FC<MobileNavProps> = ({
  isMobileOpen,
  handleMobileToggle,
}) => {
  return (
    <Drawer
      variant="temporary"
      component="nav"
      open={isMobileOpen}
      onClose={handleMobileToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <Box onClick={handleMobileToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          The MDb
        </Typography>
        <Divider />
        <List>
          <ListItem
            component={NavLink}
            to="/"
            disablePadding
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <ListItemButton>Home</ListItemButton>
          </ListItem>
          <ListItem
            component={NavLink}
            to="/movies"
            disablePadding
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            <ListItemButton>Movies</ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
